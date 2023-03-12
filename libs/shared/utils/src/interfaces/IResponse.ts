export interface IResponse {
  status: number;
  data: unknown;
  message: string;
  count?: number;
  skip?: number;
  limit?: number;
}
