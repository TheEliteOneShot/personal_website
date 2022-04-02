const config = {
  API_BASE_PROTOCOL: import.meta.env.VITE_API_BASE_PROTOCOL,
  API_BASE_HOST: import.meta.env.VITE_API_BASE_HOST,
  API_BASE_PORT: import.meta.env.VITE_API_BASE_PORT,
  API_BASE_PREFIX: import.meta.env.VITE_API_BASE_PREFIX,
  getApiBaseDocsUrl: function () {
    return `${this.API_BASE_PROTOCOL}://${this.API_BASE_HOST}:${this.API_BASE_PORT}/docs`;
  },
  getApiBaseUrl: function () {
    return `${this.API_BASE_PROTOCOL}://${this.API_BASE_HOST}:${this.API_BASE_PORT}${this.API_BASE_PREFIX}`;
  },
};

export default config;
