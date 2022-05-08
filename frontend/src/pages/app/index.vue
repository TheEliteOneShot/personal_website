<script setup lang="ts">
import { useHead } from '@vueuse/head';

import { useViewWrapper } from '/@src/stores/viewWrapper';

const viewWrapper = useViewWrapper();
viewWrapper.setPageTitle('Main Dashboard');

useHead({
  title: 'Main Dashboard',
});
</script>

<template>
  <div class="page-content-inner">
    <PersonalDashboard />
  </div>
</template>
