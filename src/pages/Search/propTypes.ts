export interface Result {
  [key: string]: string;
}
export interface ResultTypes {
  id: number;
  status: number;
  totalResults: number;
  number: number;
  offset: number;
  results: Array<Result>;
}
