<script setup lang="ts">
import { useApi } from '/@src/composable/useApi';
import { logoutUser } from '/@src/utils/api/user';
import { useUserSession } from '/@src/stores/userSession';
import { useRouter } from 'vue-router';
import { useNotyf } from '/@src/composable/useNotyf';

const api = useApi();
const userSession = useUserSession();
const router = useRouter();
const notif = useNotyf();

const handleLogout = async () => {
  await logoutUser(api)
    .then(() => {
      userSession.logoutUser();
      notif.success('Successfull Logout');
      router.push({ name: 'auth' });
    })
    // The token wasn't valid, but logout anyways
    .catch(() => {
      userSession.logoutUser();
      notif.error('Session Expired');
      router.push({ name: 'auth' });
    });
};
</script>

<template>
  <VDropdown right spaced class="user-dropdown profile-dropdown">
    <template #button="{ toggle }">
      <a
        tabindex="0"
        class="is-trigger dropdown-trigger"
        aria-haspopup="true"
        @keydown.space.prevent="toggle"
        @click="toggle"
      >
        <VAvatar picture="/images/avatars/svg/vuero-1.svg" />
      </a>
    </template>

    <template #content>
      <div class="dropdown-head">
        <VAvatar size="large" picture="/images/avatars/svg/vuero-1.svg" />

        <div class="meta">
          <span>{{ userSession?.user?.username }}</span>
          <span>{{ userSession?.user?.role }}</span>
        </div>
      </div>

      <RouterLink :to="{ name: 'me-profile-view' }" class="dropdown-item is-media">
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-user-alt"></i>
        </div>
        <div class="meta">
          <span>Profile</span>
          <span>View your profile</span>
        </div>
      </RouterLink>

      <hr class="dropdown-divider" />

      <RouterLink
        :to="{ name: 'me-profile-edit-settings' }"
        class="dropdown-item is-media"
      >
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-cog"></i>
        </div>
        <div class="meta">
          <span>Settings</span>
          <span>Account settings</span>
        </div>
      </RouterLink>

      <hr class="dropdown-divider" />

      <div class="dropdown-item is-button">
        <VButton
          class="logout-button"
          icon="feather:log-out"
          color="primary"
          role="menuitem"
          raised
          fullwidth
          @click="handleLogout"
        >
          Logout
        </VButton>
      </div>
    </template>
  </VDropdown>
</template>
