<template>
  <h1>Cleaning session...</h1>
</template>
<script>
import { LOGOUT } from "../store/auth/action.type";
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions("auth", [LOGOUT])
  },
  mounted() {
    this[LOGOUT]().then(() => {
      localStorage.clear();
      window.location = "/";
    });
  }
};
</script>