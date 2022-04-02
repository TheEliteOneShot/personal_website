<script>
import store from "../store.js";
import { defineComponent } from 'vue'

export default defineComponent({
  name: "Component1",
  setup() {
    function createToast() {
      this.$toast.success("It works");
    }
    return { store, createToast };
  }
})
</script>

<template>
  <a href="javascript:void(0);" v-on:click="createToast()">Add Toast</a>
</template>