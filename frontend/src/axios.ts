import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import injectMock from '@/mock/api/base'
import config from '@/config'

const baseURL = config.routes.baseUrl
const baseApi = axios.create({ baseURL })

// Mock the data for all API calls
if (config.API_MODE === 'mock') {
  const mock = new MockAdapter(baseApi)
  injectMock(mock)
}

export default baseApi
