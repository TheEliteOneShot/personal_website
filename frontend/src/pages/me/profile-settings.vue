<script setup lang="ts">
import { useHead } from '@vueuse/head';

import { useViewWrapper } from '/@src/stores/viewWrapper';

const viewWrapper = useViewWrapper();
viewWrapper.setPageTitle('Profile Settings');

useHead({
  title: 'Profile Settings',
});
</script>

<template>
  <div class="page-content-inner">
    <SettingsProfile />
  </div>
</template>
