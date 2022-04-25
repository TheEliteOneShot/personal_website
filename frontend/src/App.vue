<script lang="ts">
import "@/assets/scripts/navigation.js";
import "@/assets/scripts/box.icons.min.js";
import { defineComponent, computed } from "vue";
import UserActionMenuDropdown from "@/components/UserActionMenuDropdown.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "RootComponent",
  components: {
    UserActionMenuDropdown,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const currentlyLoggedIn = computed(() => store.getters["auth/isLoggedIn"]);

    const logOut = () => {
      store.commit("auth/loggedOut");
      router.push({ path: "/welcome", query: { loggedOut: "true" } });
    };

    return {
      currentlyLoggedIn,
      logOut
    };
  },
});
</script>

<template>
  <div>
    <header class="header" id="header">
      <div class="header_toggle">
        <i class="bx bx-menu" id="header-toggle"> </i>
      </div>
      <div class="header_img"><img src="/public/icon.png" /></div>
      <div>
        <UserActionMenuDropdown />
      </div>
    </header>
    <div class="l-navbar" id="nav-bar">
      <nav class="nav">
        <div>
          <router-link class="nav_link" to="/">
            <i class="bx bx-book-bookmark nav_logo-icon"> </i>
            <span class="nav_logo-name"> Zachary Laney </span>
          </router-link>
          <div class="nav_list">
            <router-link class="nav_link" to="/Welcome">
              <i class="bx bx-grid-alt nav_icon router-link-active"> </i>
              <span class="nav_name"> Welcome Page </span>
            </router-link>
            <router-link class="nav_link" to="/authtest">
              <i class="bx bx-data nav_icon"> </i>
              <span class="nav_name"> Auth Test </span>
            </router-link>
          </div>
        </div>

        <a @click="logOut" href="#" class="nav_link" v-if="currentlyLoggedIn">
          <i class="bx bx-log-out nav_icon"> </i>
          <span class="nav_name"> Sign Out </span>
        </a>
      </nav>
    </div>

    <body id="body-pd">
      <div class="content-container height-100 bg-light">
        <router-view v-slot="{ Component }">
          <keep-alive include="FullStackTest">
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </div>
    </body>
  </div>
</template>

<style>
@import "mdb-vue-ui-kit/css/mdb.min.css";
@import "@/assets/styles/navigation.css";
@import "@/assets/styles/box_icons/box.icons.min.css";
@import "@/assets/styles/ag_grid/ag_grid.min.css";

.active {
  color: black;
}

.modal-header .btn-close {
  visibility: hidden;
}
</style>
