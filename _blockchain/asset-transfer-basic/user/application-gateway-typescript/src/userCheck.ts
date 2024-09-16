/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import * as grpc from '@grpc/grpc-js';
import { connect, Contract, Identity, Signer, signers } from '@hyperledger/fabric-gateway';
import * as crypto from 'crypto';
import { promises as fs } from 'fs';
import * as path from 'path';

let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
let seconds = now.getSeconds();
let day = now.getDate();
let year = now.getFullYear();
let month = now.getMonth();

interface Arguments {
  userid: string;
  email: string;
  password: string;
  passerror: boolean;
  [x: string]: unknown;
}

const channelName = envOrDefault('CHANNEL_NAME', 'userchannel');
const chaincodeName = envOrDefault('CHAINCODE_NAME', 'userbasic');
const mspId = envOrDefault('MSP_ID', 'Org1MSP');

const cryptoPath = envOrDefault('CRYPTO_PATH', path.resolve(__dirname, '..', '..', '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com'));
const keyDirectoryPath = envOrDefault('KEY_DIRECTORY_PATH', path.resolve(cryptoPath, 'users', 'User1@org1.example.com', 'msp', 'keystore'));
const certDirectoryPath = envOrDefault('CERT_DIRECTORY_PATH', path.resolve(cryptoPath, 'users', 'User1@org1.example.com', 'msp', 'signcerts'));
const tlsCertPath = envOrDefault('TLS_CERT_PATH', path.resolve(cryptoPath, 'peers', 'peer0.org1.example.com', 'tls', 'ca.crt'));
const peerEndpoint = envOrDefault('PEER_ENDPOINT', 'localhost:7051');
const peerHostAlias = envOrDefault('PEER_HOST_ALIAS', 'peer0.org1.example.com');


const argv = yargs(hideBin(process.argv))
  .option('userid', {
    alias: 'i',
    type: 'string',
    description: 'userid',
    demandOption: true
  })
  .option('email', {
    alias: 'e',
    type: 'string',
    description: 'email'
  })
  .option('password', {
    alias: 'p',
    type: 'string',
    description: 'password'
  })
  .option('passerror', {
    alias: 's',
    type: 'boolean',
    description: 'passerror'
  })
  .help()
  .alias('help', 'h')
  .parseSync() as Arguments;



async function main(): Promise<void> {
  // The gRPC client connection should be shared by all Gateway connections to this endpoint.
  const client = await newGrpcConnection();

  const gateway = connect({
    client,
    identity: await newIdentity(),
    signer: await newSigner(),
    // Default timeouts for different gRPC calls
    evaluateOptions: () => {
      return { deadline: Date.now() + 5000 }; // 5 seconds
    },
    endorseOptions: () => {
      return { deadline: Date.now() + 15000 }; // 15 seconds
    },
    submitOptions: () => {
      return { deadline: Date.now() + 5000 }; // 5 seconds
    },
    commitStatusOptions: () => {
      return { deadline: Date.now() + 5000 }; // 1 minute
    },
  });

  try {
    const network = await gateway.getNetwork(channelName);

    // Get the smart contract from the network.
    const contract = network.getContract(chaincodeName);
    let res = "";

    if (await assetExists(contract)) { res += "name"; };
    if (await emailExists(contract)) { res += "email"; };
    if (res == "" && !argv.passerror && (argv.userid.length > 3 && argv.userid.length <= 20)) { await createAsset(contract); console.log("success") };
    if (res == "name") { console.log(res) };
    if (res == "email") { console.log(res) };
    if (res == "nameemail") { console.log(res) };

  } finally {
    gateway.close();
    client.close();
  }
}

main().catch((error: unknown) => {
  console.error('--> Ошибка запуска операции', error);
});



async function newGrpcConnection(): Promise<grpc.Client> {
  const tlsRootCert = await fs.readFile(tlsCertPath);
  const tlsCredentials = grpc.credentials.createSsl(tlsRootCert);
  return new grpc.Client(peerEndpoint, tlsCredentials, {
    'grpc.ssl_target_name_override': peerHostAlias,
  });
}

async function newIdentity(): Promise<Identity> {
  const certPath = await getFirstDirFileName(certDirectoryPath);
  const credentials = await fs.readFile(certPath);
  return { mspId, credentials };
}

async function getFirstDirFileName(dirPath: string): Promise<string> {
  const files = await fs.readdir(dirPath);
  const file = files[0];
  if (!file) {
    throw new Error(`No files in directory: ${dirPath}`);
  }
  return path.join(dirPath, file);
}

async function newSigner(): Promise<Signer> {
  const keyPath = await getFirstDirFileName(keyDirectoryPath);
  const privateKeyPem = await fs.readFile(keyPath);
  const privateKey = crypto.createPrivateKey(privateKeyPem);
  return signers.newPrivateKeySigner(privateKey);
}

async function assetExists(contract: Contract): Promise<boolean> {

  const resultBytes = await contract.evaluateTransaction('AssetExists', argv.userid);
  const resultString = Buffer.from(resultBytes).toString('utf8');
  const exists = resultString === 'true';

  return exists;
}

async function emailExists(contract: Contract): Promise<boolean> {

  const resultBytes = await contract.evaluateTransaction('EmailExists', argv.email);
  const resultString = Buffer.from(resultBytes).toString('utf8');
  const exists = resultString === 'true';

  return exists;
}

async function createAsset(contract: Contract): Promise<void> {

  await contract.submitTransaction(
    'CreateAsset',
    argv.userid, // username
    argv.email, // email
    argv.password, // password
    "sigma_corporation", // owner
    `${((hours > 9) ? hours : '0' + hours)}:${((minutes > 9) ? minutes : '0' + minutes)}:${((seconds > 9) ? seconds : '0' + seconds)}-${((day > 9) ? day : '0' + day)}.${((month > 9) ? (month + 1) : '0' + (month + 1))}.${((year > 9) ? year : '0' + year)}`, // time
    'new' // access
  );
}

/**
 * envOrDefault() will return the value of an environment variable, or a default value if the variable is undefined.
 */
function envOrDefault(key: string, defaultValue: string): string {
  return process.env[key] || defaultValue;
}
