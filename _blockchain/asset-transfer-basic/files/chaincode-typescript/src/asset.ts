/*
  SPDX-License-Identifier: Apache-2.0
*/

import { Object, Property } from 'fabric-contract-api';

@Object()
export class Asset {
  @Property()
  public docType?: string;

  @Property()
  public Owner: string = '';

  @Property()
  public Filename: string = '';

  @Property()
  public Extension: string = '';

  @Property()
  public Hash: string = '';
}
