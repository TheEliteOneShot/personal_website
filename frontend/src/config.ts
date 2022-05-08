const LOG_LEVEL = {
  debug: 'debug',
  info: 'info',
  error: 'error',
  none: 'none',
};

const API_MODES = {
  mock: 'mock',
  dev: 'dev',
  prod: 'prod',
};

const env = {
  ECHO_ALL_API_REQUESTS: true,
  ECHO_ALL_API_RESPONSES: true,
  ECHO_ALL_API_ERRORS: true,
  LOG_LEVEL: LOG_LEVEL.debug,
  API_MODE: API_MODES.dev,
  // @ts-ignore
  API_BASE_PROTOCOL: import.meta.env.VITE_API_BASE_PROTOCOL,
  // @ts-ignore
  API_BASE_HOST: import.meta.env.VITE_API_BASE_HOST,
  // @ts-ignore
  API_BASE_PORT: import.meta.env.VITE_API_BASE_PORT,
  // @ts-ignore
  API_BASE_PREFIX: import.meta.env.VITE_API_BASE_PREFIX,
};

const routes = {
  baseUrl: `${env.API_BASE_PROTOCOL}://${env.API_BASE_HOST}:${env.API_BASE_PORT}${env.API_BASE_PREFIX}`,
  docsUrl: `${env.API_BASE_PROTOCOL}://${env.API_BASE_HOST}:${env.API_BASE_PORT}/docs`,
  authApi: {
    baseUrl: `${env.API_BASE_PROTOCOL}://${env.API_BASE_HOST}:${env.API_BASE_PORT}${env.API_BASE_PREFIX}/auth`,
    refreshAccessToken: `${env.API_BASE_PROTOCOL}://${env.API_BASE_HOST}:${env.API_BASE_PORT}${env.API_BASE_PREFIX}/auth/token/refresh`,
  },
  userApi: {
    baseUrl: `${env.API_BASE_PROTOCOL}://${env.API_BASE_HOST}:${env.API_BASE_PORT}${env.API_BASE_PREFIX}/user`,
    createUser: `${env.API_BASE_PROTOCOL}://${env.API_BASE_HOST}:${env.API_BASE_PORT}${env.API_BASE_PREFIX}/user/create`,
    getUserFromServer: `${env.API_BASE_PROTOCOL}://${env.API_BASE_HOST}:${env.API_BASE_PORT}${env.API_BASE_PREFIX}/user/me`,
    getUserItemsFromServer: `${env.API_BASE_PROTOCOL}://${env.API_BASE_HOST}:${env.API_BASE_PORT}${env.API_BASE_PREFIX}/user/me/items`,
    logIn: `${env.API_BASE_PROTOCOL}://${env.API_BASE_HOST}:${env.API_BASE_PORT}${env.API_BASE_PREFIX}/user/login`,
    logOut: `${env.API_BASE_PROTOCOL}://${env.API_BASE_HOST}:${env.API_BASE_PORT}${env.API_BASE_PREFIX}/user/logout`,
  },
};

const config = { ...env, routes };

export default config;
