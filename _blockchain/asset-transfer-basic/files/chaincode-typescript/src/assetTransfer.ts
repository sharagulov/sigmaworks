/*
 * SPDX-License-Identifier: Apache-2.0
 */
// Deterministic JSON.stringify()

import { Context, Contract, Info, Returns, Transaction } from 'fabric-contract-api';
import stringify from 'json-stringify-deterministic';
import sortKeysRecursive from 'sort-keys-recursive';
import { Asset } from './asset';

@Info({ title: 'AssetTransfer', description: 'Smart contract for trading assets' })
export class AssetTransferContract extends Contract {

  @Transaction()
  public async InitLedger(ctx: Context): Promise<void> {
    const assets: Asset[] = [
      {
        Filename: 'document',
        Owner: 'user',
        Extension: '.',
        Hash: '0000'
      },
    ];
    for (const asset of assets) {
      asset.docType = 'asset';
      await ctx.stub.putState(asset.Filename, Buffer.from(stringify(sortKeysRecursive(asset))));
      console.info(`Asset ${asset.Filename} initialized`);
    }
  }

  @Transaction()
  public async CreateAsset(ctx: Context, filename: string, owner: string, extension: string, hash: string): Promise<void> {
    const asset = {
      Filename: filename,
      Owner: owner,
      Extension: extension,
      Hash: hash
    };
    await ctx.stub.putState(filename, Buffer.from(stringify(sortKeysRecursive(asset))));
  }

  @Transaction(false)
  public async ReadAsset(ctx: Context, filename: string): Promise<string> {
    const assetJSON = await ctx.stub.getState(filename); // get the asset from chaincode state
    if (assetJSON.length === 0) {
      throw new Error(`The asset ${filename} does not exist`);
    }
    return assetJSON.toString();
  }


  @Transaction()
  public async UpdateAsset(ctx: Context, filename: string, owner: string, extension: string, hash: string): Promise<void> {
    const exists = await this.AssetExists(ctx, filename);
    if (!exists) {
      throw new Error(`The asset ${filename} does not exist`);
    }
    const updatedAsset = {
      Filename: filename,
      Owner: owner,
      Extension: extension,
      Hash: hash
    };

    return ctx.stub.putState(filename, Buffer.from(stringify(sortKeysRecursive(updatedAsset))));
  }

  @Transaction()
  public async DeleteAsset(ctx: Context, fileanme: string): Promise<void> {
    const exists = await this.AssetExists(ctx, fileanme);
    if (!exists) {
      throw new Error(`The asset ${fileanme} does not exist`);
    }
    return ctx.stub.deleteState(fileanme);
  }

  @Transaction(false)
  @Returns('boolean')
  public async AssetExists(ctx: Context, fileanme: string): Promise<boolean> {
    const assetJSON = await ctx.stub.getState(fileanme);
    return assetJSON.length > 0;
  }


  @Transaction()
  public async TransferAsset(ctx: Context, owner: string, newOwner: string): Promise<string> {
    const assetString = await this.ReadAsset(ctx, owner);
    const asset = JSON.parse(assetString) as Asset;
    const oldOwner = asset.Owner;
    asset.Owner = newOwner;
    await ctx.stub.putState(owner, Buffer.from(stringify(sortKeysRecursive(asset))));
    return oldOwner;
  }

  @Transaction(false)
  @Returns('string')
  public async GetAllAssets(ctx: Context): Promise<string> {
    const allResults = [];
    const iterator = await ctx.stub.getStateByRange('', '');
    let result = await iterator.next();
    while (!result.done) {
      const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
      let record;
      try {
        record = JSON.parse(strValue) as Asset;
      } catch (err) {
        console.log(err);
        record = strValue;
      }
      allResults.push(record);
      result = await iterator.next();
    }
    return JSON.stringify(allResults);
  }

}
