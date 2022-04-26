<script lang="ts">
import { onMounted, defineComponent } from "vue";
import { loadScript } from "vue-plugin-load-script";
// @ts-ignore
import agGridUrl from "@/assets/scripts/ag_grid_enterprise.min.js?url";
import logger from "@/services/logging/logger";
import { useStore } from "vuex";

export default defineComponent({
  name: "AuthTest",
  setup() {
    const store = useStore();
    onMounted(async () => {
      await loadScript(agGridUrl).catch(() => {
        logger.debug("AuthTest.vue: AG Grid script failed to load.");
      });

      async function createServerSideDatasource() {
        return {
          getRows: async function (params) {
            return await store
              .dispatch("user/getUserItemsFromServer")
              .then(async (response) => {
                if (response.ok) {
                  // TODO: Have a javascript Web Worker parse the JSON response
                  console.log(
                    `Got server side response: ${JSON.stringify(response)}`
                  );
                  params.success({ rowData: response?.payload?.data });
                } else {
                  params.fail();
                }
              })
              .catch((error) => {
                console.error(error);
              });
          },
        };
      }

      const gridDivServer = document.querySelector("#fullstack");

      var gridOptionsServer = {
        columnDefs: [
          { field: "owner", minWidth: 220 },
          { field: "description", minWidth: 200 },
        ],
        defaultColDef: {
          flex: 1,
          minWidth: 100,
          sortable: true,
          resizable: true,
        },
        rowSelection: null,
        rowModelType: "serverSide",
        serverSideStoreType: "full",
        animateRows: true,
      };

      // @ts-ignore
      new agGrid.Grid(gridDivServer, gridOptionsServer);

      // @ts-ignore
      gridOptionsServer.api.setServerSideDatasource(
        await createServerSideDatasource()
      );
    });
    return {};
  },
});
</script>
<template>
  <main>
    <div class="container">
      <div
        id="fullstack"
        style="height: 600px; width: 100%"
        class="ag-theme-alpine"
      ></div>
    </div>
  </main>
</template>

<style scoped>
.container {
  display: contents;
}
</style>

