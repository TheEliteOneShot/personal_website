<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";

export default defineComponent({
  name: "UserActionMenuDropdown",
  setup() {
    const store = useStore();
    const toast = useToast();
    const currentlyLoggedIn = computed(() => store.getters["auth/isLoggedIn"]);

    const logOut = async () => {
      await store.dispatch("user/logout");
    };

    const test = () => {
      toast.success("test");
    };

    const showDropdown = ref(false);
    return { showDropdown, currentlyLoggedIn, logOut, test };
  },
});
</script>

<template>
  <mdb-dropdown btnGroup dropstart v-model="showDropdown">
    <mdb-dropdown-toggle @click="showDropdown = !showDropdown">
      Menu
    </mdb-dropdown-toggle>
    <mdb-dropdown-menu class="noselect" :animation="false">
      <!-- <mdb-dropdown-item v-if="!currentlyLoggedIn" @click="test" href="#"> Test </mdb-dropdown-item> -->
      <mdb-dropdown-item v-if="!currentlyLoggedIn" to="/login">
        Login
      </mdb-dropdown-item>
      <mdb-dropdown-item v-if="!currentlyLoggedIn" to="/createaccount">
        Create Account
      </mdb-dropdown-item>
      <!-- <mdb-dropdown-item v-if="!currentlyLoggedIn" divider /> -->
      <mdb-dropdown-item href="#" @click="logOut" v-if="currentlyLoggedIn">
        Logout
      </mdb-dropdown-item>
    </mdb-dropdown-menu>
  </mdb-dropdown>
</template>

<style>
</style>
