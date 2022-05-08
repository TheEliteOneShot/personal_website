<script setup lang="ts">
import { useHead } from '@vueuse/head';
import { useViewWrapper } from '/@src/stores/viewWrapper';

const viewWrapper = useViewWrapper();
viewWrapper.setPageTitle('Profile Edit Skills');

useHead({
  title: 'Profile Edit Skills',
});
</script>

<template>
  <EditProfileSkills />
</template>
