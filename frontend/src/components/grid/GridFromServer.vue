<script lang="ts">
import { defineComponent, onMounted, onActivated, ref } from 'vue';
import agGrid from '/@src/ag-grid';
import { useDarkmode } from '/@src/stores/darkmode';
export default defineComponent({
  name: 'GridUserItems',
  props: ['serverDataSource', 'options'],
  setup(props) {
    const darkmode = useDarkmode();
    onActivated(async () => {
      if (props.options?.api?.refreshServerSideStore !== undefined)
        props.options.api.refreshServerSideStore();
    });

    const onGridReady = async (params: any) => {
      params.api.showLoadingOverlay();
    };

    const onFirstDataRendered = async (params: any) => {
      params.api.sizeColumnsToFit();
      await new Promise((resolve) => setTimeout(resolve, 100));
      showGrid.value = true;
      params.api.hideOverlay();
    };

    onMounted(async () => {
      const element = document.querySelector('#gridTarget');
      props.options.onFirstDataRendered = onFirstDataRendered;
      props.options.onGridReady = onGridReady;
      await agGrid.Grid(element, props.options);
      props.options.api.setServerSideDatasource(await props.serverDataSource());
    });

    const showGrid = ref(false);

    return { showGrid, darkmode };
  },
});
</script>

<template>
  <div class="container">
    <div
      id="gridTarget"
      :class="{
        visible: showGrid,
        'ag-theme-alpine-dark': darkmode.isDark,
        'ag-theme-alpine': !darkmode.isDark,
      }"
      style="height: 600px; width: auto"
      class=""
    ></div>
  </div>
</template>

<style>
.ag-overlay-panel {
  background-color: darkgrey !important;
}
</style>
