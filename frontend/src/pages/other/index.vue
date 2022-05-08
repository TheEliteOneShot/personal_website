<script setup lang="ts">
import { useHead } from '@vueuse/head';
import { useApi } from '/@src/composable/useApi';
import { getUserItems } from '/@src/utils/api/user';

import { useViewWrapper } from '/@src/stores/viewWrapper';

const viewWrapper = useViewWrapper();
viewWrapper.setPageTitle('Auth Test');

const api = useApi();

useHead({
  title: 'Auth Test',
});

const gridServerDataSource = async () => {
  return {
    getRows: async function (params: any) {
      return await getUserItems(api)
        .then(async (data) => {
          params.success({ rowData: data });
        })
        .catch(() => {
          params.fail();
        });
    },
  };
};

const gridServerDataOptions = {
  columnDefs: [
    { field: 'owner', minWidth: 220 },
    { field: 'description', minWidth: 200 },
  ],
  defaultColDef: {
    sortable: true,
    resizable: true,
  },
  rowModelType: 'serverSide',
  serverSideStoreType: 'full',
  animateRows: true,
};
</script>

<template>
  <div class="page-content-inner">
    <GridFromServer
      :server-data-source="gridServerDataSource"
      :options="gridServerDataOptions"
    />
  </div>
</template>
