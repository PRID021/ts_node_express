export interface ServerResponse<R> {
  statusCode: number;
  message: string;
  data: R;
}
