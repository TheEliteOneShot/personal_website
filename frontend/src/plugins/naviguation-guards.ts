// import { START_LOCATION } from 'vue-router'
import { definePlugin } from '/@src/app';
import { useUserSession } from '/@src/stores/userSession';
import { getUser } from '/@src/utils/api/user';
import { useNotyf } from '/@src/composable/useNotyf';

/**
 * Here we are setting up two router navigation guards
 * (note that we can have multiple guards in multiple plugins)
 *
 * We can add meta to pages either by declaring them manualy in the
 * routes declaration (see /@src/router.ts)
 * or by adding a <route> tag into .vue files (see /@src/pages/sidebar/dashboards.ts)
 *
 * <route lang="yaml">
 * meta:
 *   requiresAuth: true
 * </route>
 *
 * <script setup lang="ts">
 *  // TS script
 * </script>
 *
 * <template>
 *  // HTML content
 * </template>
 */
export default definePlugin(({ router, api, pinia }) => {
  router.beforeEach(async (to) => {
    const userSession = useUserSession(pinia);
    const notyf = useNotyf();
    if (to.path === '/' && userSession.isLoggedIn) {
      // 1. If the name is not set, it means we are navigating to the first page
      // and we are logged in, so we should check user information from the server

      // Do api request call to retreive user profile.
      // Note that the api is provided with json-server
      return await getUser(api)
        .then((user) => {
          userSession.setUser(user);
          notyf.success(`Welcome back, ${user.username}`);
          console.log('returning app');
          return {
            name: 'app',
          };
        })
        .catch(() => {
          userSession.logoutUser();
          notyf.error('Session Expired');

          if (to.meta.requiresAuth) {
            // redirect the user somewhere
            return {
              // Will follow the redirection set in /@src/pages/auth/index.vue
              name: 'auth',
              // save the location we were at to come back later
              query: { redirect: to.fullPath },
            };
          }
        });
    } else if (to.meta.requiresAuth && !userSession.isLoggedIn) {
      // 2. If the requires auth via requiresAuth meta, check if user is logged in
      // if not, redirect to login page.
      notyf.error({
        message: 'You must login to access this page',
        duration: 7000,
      });

      return {
        // Will follow the redirection set in /@src/pages/auth/index.vue
        name: 'auth',
        // save the location we were at to come back later
        query: { redirect: to.fullPath },
      };
    }
  });
});
