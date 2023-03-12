import { IResponse } from "../interfaces/IResponse";


export class ResponseService implements IResponse {
  public status: number;
  public data: unknown;
  public message: string;
  public count?: number;
  public skip?: number;
  public limit?: number;

  constructor(_status: number, _data: unknown, _message: string, _count = null, _skip = null, _limit = null) {
    this.status = _status;
    this.data = _data;
    this.message = _message;

    if (_count !== null) {
      this.count = _count;
      this.skip = Number(_skip);
      this.limit = Number(_limit);
    }
  }
}
