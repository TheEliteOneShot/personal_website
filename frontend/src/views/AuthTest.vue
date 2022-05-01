<script lang="ts">
import { onMounted, defineComponent } from "vue";
import GridFromServer from "@/components/GridFromServer.vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "AuthTest",
  components: {
    GridFromServer,
  },
  setup() {
    const store = useStore();

    onMounted(async () => {});

    const gridServerDataSource = async () => {
      return {
        getRows: async function (params) {
          return await store
            .dispatch("user/getUserItemsFromServer")
            .then(async (response) => {
              if (response.ok) {
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
    };

    const gridServerDataOptions = {
      columnDefs: [
        { field: "owner", minWidth: 220 },
        { field: "description", minWidth: 200 },
      ],
      defaultColDef: {
        sortable: true,
        resizable: true,
      },
      rowModelType: "serverSide",
      serverSideStoreType: "full",
      animateRows: true
    };

    return { gridServerDataSource, gridServerDataOptions };
  },
});
</script>
<template>
  <main>
    <GridFromServer
      :serverDataSource="gridServerDataSource"
      :options="gridServerDataOptions"
    />
  </main>
</template>

<style scoped>
.container {
  display: contents;
}
</style>

