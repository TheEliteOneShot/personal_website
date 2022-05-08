import type { AxiosInstance } from 'axios';
import config from '/@src/config';

const loginUserRoute = config.routes.userApi.logIn;

export interface Login {
  credential: String;
  password: String;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export async function loginUser(
  api: AxiosInstance,
  payload: Login
): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>(
    loginUserRoute,
    JSON.stringify(payload),
    { headers: { 'Content-Type': 'application/json' } }
  );
  return data;
}
