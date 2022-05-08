<script setup lang="ts">
import { useHead } from '@vueuse/head';
import { useViewWrapper } from '/@src/stores/viewWrapper';

const viewWrapper = useViewWrapper();
viewWrapper.setPageTitle('Profile Edit General');

useHead({
  title: 'Profile Edit General',
});
</script>

<template>
  <EditProfileGeneral />
</template>
