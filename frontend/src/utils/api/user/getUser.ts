import type { AxiosInstance } from 'axios';
import config from '/@src/config';
import { User } from '/@src/models/users';

const getUserRoute = config.routes.userApi.getUserFromServer;

export async function getUser(api: AxiosInstance): Promise<User> {
  const { data } = await api.get<User>(getUserRoute);
  return data;
}
