import { createStore } from 'vuex'
import authModule from '@/stores/modules/auth'
import userModule from '@/stores/modules/user'

export default createStore({
  modules: {
    auth: authModule,
    user: userModule
  }
})
