import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import injectMock from '@/mock/api/base'
import config from '@/config'

const baseURL = config.routes.baseUrl
const baseApi = axios.create({ baseURL })

// baseApi.interceptors.request.use(
//   function (config) {
//     // Modify request parameters here
//     return config
//   },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error)
//   }
// )

// baseApi.interceptors.response.use(function (response) {
//   // Any status code that is within the range of 2xx cause this function to trigger
//   // Do something with response data
//   return response
// }, function (error) {
//   // Any status codes that falls outside the range of 2xx cause this function to trigger
//   // Do something with response error
//   return Promise.reject(error)
// })

// Mock the data for all API calls
if (config.API_MODE === 'mock') {
  const mock = new MockAdapter(baseApi)
  injectMock(mock)
}

export default baseApi
