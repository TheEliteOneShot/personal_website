<script setup lang="ts">
import { useHead } from '@vueuse/head';
import { useViewWrapper } from '/@src/stores/viewWrapper';

const viewWrapper = useViewWrapper();
viewWrapper.setPageTitle('Profile Edit Settings');

useHead({
  title: 'Profile Edit Settings',
});
</script>

<template>
  <EditProfileSettings />
</template>
