<script setup lang="ts">
import { initDarkmode } from '/@src/stores/darkmode';

// This is the global app setup function

/**
 * Initialize the darkmode watcher
 *
 * @see /@src/stores/darkmode
 */
initDarkmode();
</script>

<template>
  <div>
    <Suspense>
      <RouterView v-slot="{ Component }">
        <Transition name="fade-slow" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </Suspense>
    <VReloadPrompt app-name="mainApplication" />
  </div>
</template>
