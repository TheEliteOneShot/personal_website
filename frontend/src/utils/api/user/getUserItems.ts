import type { AxiosInstance } from 'axios';
import config from '/@src/config';

const getUserItemsRoute = config.routes.userApi.getUserItemsFromServer;

export interface UserItems {
  owner: string;
  description: string;
}

export async function getUserItems(api: AxiosInstance): Promise<UserItems> {
  const { data } = await api.get<UserItems>(getUserItemsRoute);
  return data;
}
