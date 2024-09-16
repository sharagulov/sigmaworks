/*
  SPDX-License-Identifier: Apache-2.0
*/

import { Object, Property } from 'fabric-contract-api';

@Object()
export class Asset {
  @Property()
  public docType?: string;

  @Property()
  public Userid: string = '';

  @Property()
  public Email: string = '';

  @Property()
  public Password: string = '';

  @Property()
  public Owner: string = '';

  @Property()
  public Time: string = '';

  @Property()
  public Access: string = '';
}
