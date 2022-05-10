<script setup lang="ts">
import { useHead } from '@vueuse/head';

import { useViewWrapper } from '/@src/stores/viewWrapper';

const viewWrapper = useViewWrapper();
viewWrapper.setPageTitle('Profile Notifications');

useHead({
  title: 'Profile Notifications',
});
</script>

<template>
  <div class="page-content-inner">
    <NotificationPage />
  </div>
</template>
