export type StatusTypes = 'ok'|'error';

export interface IApiResponse {
    status: StatusTypes,
    message?: string,
    payload?: any,
  }
  