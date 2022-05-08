import type { AxiosInstance } from 'axios';
import config from '/@src/config';

const createUserRoute = config.routes.userApi.createUser;

export interface CreateAccount {
  password: String;
  username: String;
  firstname: String;
  lastname: String;
  email: String;
}

export interface CreateAccountResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export async function createUser(
  api: AxiosInstance,
  payload: CreateAccount
): Promise<CreateAccountResponse> {
  const { data } = await api.post<CreateAccountResponse>(
    createUserRoute,
    JSON.stringify(payload),
    { headers: { 'Content-Type': 'application/json' } }
  );
  return data;
}
