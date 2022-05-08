import type { AxiosInstance } from 'axios';
import config from '/@src/config';

const logoutUserRoute = config.routes.userApi.logOut;

export async function logoutUser(api: AxiosInstance): Promise<boolean> {
  await api.post(logoutUserRoute, null, {
    headers: { 'Content-Type': 'application/json' },
  });
  return true;
}
