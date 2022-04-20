<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: "UserActionMenuDropdown",
  setup() {
    const showDropdown = ref(false);
    return { showDropdown };
  }
})
</script>

<template>
  <mdb-dropdown btnGroup dropstart v-model="showDropdown">
    <mdb-dropdown-toggle @click="showDropdown = !showDropdown">Menu</mdb-dropdown-toggle>
    <mdb-dropdown-menu class="noselect" :animation="false">
      <mdb-dropdown-item to="/login">Login</mdb-dropdown-item>
      <mdb-dropdown-item to="/createaccount">Create Account</mdb-dropdown-item>
      <mdb-dropdown-item divider />
      <mdb-dropdown-item to="/logout">Logout</mdb-dropdown-item>
    </mdb-dropdown-menu>
  </mdb-dropdown>
</template>


<style>
.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
</style>