<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router'
import { useStore } from "vuex";
import { useToast } from "vue-toastification";

export default defineComponent({
  name: 'UserActionMenuDropdown',
  setup() {
    const store = useStore();
    const toast = useToast();
    const router = useRouter();
    const currentlyLoggedIn = computed(() => store.getters['auth/isLoggedIn']);

    const logOut = () => {
      store.commit('auth/loggedOut')
      router.push({ path: '/welcome', query: { loggedOut: 'true' } })
    }

    const test = () => {
      toast.success('test');
    }

    const showDropdown = ref(false);
    return { showDropdown, currentlyLoggedIn, logOut, test };
  }
});
</script>

<template>
  <mdb-dropdown btnGroup dropstart v-model="showDropdown">
    <mdb-dropdown-toggle @click="showDropdown = !showDropdown">Menu</mdb-dropdown-toggle>
    <mdb-dropdown-menu class="noselect" :animation="false">
      <!-- <mdb-dropdown-item v-if="!currentlyLoggedIn" @click="test" href="#">Test</mdb-dropdown-item> -->
      <mdb-dropdown-item v-if="!currentlyLoggedIn" to="/login">Login</mdb-dropdown-item>
      <mdb-dropdown-item v-if="!currentlyLoggedIn" to="/createaccount">Create Account</mdb-dropdown-item>
      <!-- <mdb-dropdown-item v-if="!currentlyLoggedIn" divider /> -->
      <mdb-dropdown-item href="#" @click="logOut" v-if="currentlyLoggedIn">Logout</mdb-dropdown-item>
    </mdb-dropdown-menu>
  </mdb-dropdown>
</template>

<style>
.noselect {
  -webkit-touch-callout: none;
  /* iOS Safari */
  -webkit-user-select: none;
  /* Safari */
  -khtml-user-select: none;
  /* Konqueror HTML */
  -moz-user-select: none;
  /* Old versions of Firefox */
  -ms-user-select: none;
  /* Internet Explorer/Edge */
  user-select: none;
  /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
}
</style>
