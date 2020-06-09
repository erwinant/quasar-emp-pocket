<template>
  <div id="q-app">
    <router-view/>
  </div>
</template>

<script>
import { Notify } from "quasar";
import { LoadingBar } from "quasar";
import { mapState, mapActions } from "vuex";
import { SHOW_ALERT, HIDE_ALERT } from "./store/alert/action.type";
export default {
  name: "App",
  computed: {
    ...mapState("alert", ["state"])
  },
  methods: {
    ...mapActions("alert", [SHOW_ALERT, HIDE_ALERT])
  },
  created() {
    this.$q.loadingBar.setDefaults({
      color: "#e63946",
      size: "5px",
      position: "top"
    });
  },
  watch: {
    state: {
      deep: true,
      handler: function(val, oldVal) {
        if (val.title.length) {
          this.$q.notify({
            message: val.title,
            type: val.type,
            caption: val.message,
            timeout: 5000,
            actions: [
              {
                label: "dismiss",
                color: "white",
                handler: () => {
                  this[HIDE_ALERT]();
                }
              }
            ]
          });
          setTimeout(() => {
            this[HIDE_ALERT]();
          }, 5000);
        }
      }
    }
  }
};
</script>
