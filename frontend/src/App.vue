<script setup>
import "@/assets/scripts/navigation.js"
import "@/assets/scripts/box.icons.min.js"
</script>

<template>
     <header class="header" id="header">
    <div class="header_toggle"> <i class='bx bx-menu' id="header-toggle"></i> </div>
    <div class="header_img"><img src="/public/icon.png" /></div>
    </header>
    <div class="l-navbar" id="nav-bar">
        <nav class="nav">
        <div>
            <a href="#" class="nav_logo"> <i class='bx bx-book-bookmark nav_logo-icon'></i> <span class="nav_logo-name">Demonstration</span> </a>
            <div class="nav_list">
                <router-link class="nav_link" to="/one"><i class='bx bx-grid-alt nav_icon'></i> <span class="nav_name">Material Design</span></router-link>
                <router-link class="nav_link" to="/two"><i class='bx bx-message-square-detail nav_icon'></i> <span class="nav_name">Toasts</span></router-link>
                <router-link class="nav_link" to="/three"><i class='bx bx-data nav_icon'></i> <span class="nav_name">Full Stack</span></router-link>
            </div>
        </div>
        <a href="#" class="nav_link"> <i class='bx bx-log-out nav_icon'></i> <span class="nav_name">Sign Out</span> </a>
        </nav>
    </div>
    <body id="body-pd">
        <div class="content-container height-100 bg-light">
        <router-view></router-view>
        </div>
    </body>
</template>

<style>
@import 'vue-toast-notification/dist/theme-sugar.css';
@import 'mdb-vue-ui-kit/css/mdb.min.css';
@import '@/assets/styles/navigation.css';
@import '@/assets/styles/box_icons/box.icons.min.css';
@import '@/assets/styles/ag_grid/ag_grid.min.css';

.active {
  color: black;
}
</style>