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
import { promises as fsp } from 'fs';
import * as fs from 'fs';
import * as path from 'path';


interface Arguments {
  owner: string;
  filename: string;
  extension: string;
  hashfile: string;
}

const channelName = envOrDefault('CHANNEL_NAME', 'fileschannel');
const chaincodeName = envOrDefault('CHAINCODE_NAME', 'filesbasic');
const mspId = envOrDefault('MSP_ID', 'Org1MSP');

const cryptoPath = envOrDefault('CRYPTO_PATH', path.resolve(__dirname, '..', '..', '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com'));
const keyDirectoryPath = envOrDefault('KEY_DIRECTORY_PATH', path.resolve(cryptoPath, 'users', 'User1@org1.example.com', 'msp', 'keystore'));
const certDirectoryPath = envOrDefault('CERT_DIRECTORY_PATH', path.resolve(cryptoPath, 'users', 'User1@org1.example.com', 'msp', 'signcerts'));
const tlsCertPath = envOrDefault('TLS_CERT_PATH', path.resolve(cryptoPath, 'peers', 'peer0.org1.example.com', 'tls', 'ca.crt'));
const peerEndpoint = envOrDefault('PEER_ENDPOINT', 'localhost:7051');
const peerHostAlias = envOrDefault('PEER_HOST_ALIAS', 'peer0.org1.example.com');

const argv = yargs(hideBin(process.argv))
  .option('filename', {
    type: 'string',
    demandOption: true
  })
  .option('owner', {
    type: 'string',
    demandOption: true
  })
  .option('extension', {
    type: 'string',
    demandOption: true
  })
  .option('hashfile', {
    type: 'string',
    demandOption: true
  })
  .strict()
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

    await createAsset(contract);


  } finally {
    gateway.close();
    client.close();
  }
}

main().catch((error: unknown) => {
  console.error('--> Ошибка запуска операции', error);
});



async function newGrpcConnection(): Promise<grpc.Client> {
  const tlsRootCert = await fsp.readFile(tlsCertPath);
  const tlsCredentials = grpc.credentials.createSsl(tlsRootCert);
  return new grpc.Client(peerEndpoint, tlsCredentials, {
    'grpc.ssl_target_name_override': peerHostAlias,
  });
}

async function newIdentity(): Promise<Identity> {
  const certPath = await getFirstDirFileName(certDirectoryPath);
  const credentials = await fsp.readFile(certPath);
  return { mspId, credentials };
}

async function getFirstDirFileName(dirPath: string): Promise<string> {
  const files = await fsp.readdir(dirPath);
  const file = files[0];
  if (!file) {
    throw new Error(`No files in directory: ${dirPath}`);
  }
  return path.join(dirPath, file);
}

async function newSigner(): Promise<Signer> {
  const keyPath = await getFirstDirFileName(keyDirectoryPath);
  const privateKeyPem = await fsp.readFile(keyPath);
  const privateKey = crypto.createPrivateKey(privateKeyPem);
  return signers.newPrivateKeySigner(privateKey);
}

async function createAsset(contract: Contract): Promise<void> {

  const hashFilePath = argv.hashfile;
  const hash = fs.readFileSync(hashFilePath, 'utf-8');

  await contract.submitTransaction(
    'CreateAsset',
    argv.filename + "_" + (Math.floor(100000 + Math.random() * 900000)).toString(), // 
    argv.owner,
    argv.extension,
    hash,
    public,
    private
  );
  console.log('--> Успешно');
}

/**
 * envOrDefault() will return the value of an environment variable, or a default value if the variable is undefined.
 */
function envOrDefault(key: string, defaultValue: string): string {
  return process.env[key] || defaultValue;
}
