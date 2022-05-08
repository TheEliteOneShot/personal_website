import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useStorage } from '@vueuse/core';
import { User } from '/@src/models/users';

export type UserData = Record<string, any> | null;

export const useUserSession = defineStore('userSession', () => {
  // token will be synced with local storage
  // @see https://vueuse.org/core/usestorage/
  const token = useStorage('accessToken', '');
  const refreshToken = useStorage('refreshToken', '');

  const user = useStorage('user', <User>{});
  const isTokenRefreshing = ref(false);
  const loading = ref(true);

  const isLoggedIn = computed(() => token.value !== undefined && token.value !== '');

  function setUser(newUser: User) {
    user.value = newUser;
  }

  async function setIsTokenRefreshing(status: boolean) {
    isTokenRefreshing.value = status;
  }

  async function setToken(newToken: string) {
    token.value = newToken;
  }

  async function setRefreshToken(newRefreshToken: string) {
    refreshToken.value = newRefreshToken;
  }

  function setLoading(newLoading: boolean) {
    loading.value = newLoading;
  }

  async function logoutUser() {
    token.value = undefined;
    refreshToken.value = undefined;
    user.value = undefined;
  }

  return {
    user,
    token,
    refreshToken,
    isLoggedIn,
    loading,
    isTokenRefreshing,
    logoutUser,
    setUser,
    setToken,
    setLoading,
    setIsTokenRefreshing,
    setRefreshToken,
  } as const;
});

/**
 * Pinia supports Hot Module replacement so you can edit your stores and
 * interact with them directly in your app without reloading the page.
 *
 * @see https://pinia.esm.dev/cookbook/hot-module-replacement.html
 * @see https://vitejs.dev/guide/api-hmr.html
 */
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserSession, import.meta.hot));
}
