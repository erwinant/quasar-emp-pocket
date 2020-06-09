<template>
  <div class="alert-container">
    <q-card bordered :class="styling">
      <q-card-section>
        <div class="text-h6">{{alert.title}}</div>
        <div>{{ alert.message }}</div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
export default {
  name: "Alert",
  props: {
    alert: Object
  },
  created(){
      this.$q.notify("test")
  },
  computed: {
    styling() {
      switch (this.alert.type) {
        case "succes":
          return "bg-secondary text-white";
        case "danger":
          return "bg-accent text-white";
        case "warning":
          return "bg-warning text-white";
        default:
          // this one info as default
          return "bg-white text-black";
      }
      return "bg-secondary text-white";
    }
  }
};
</script>
<style lang="scss" scoped>
.alert-container {
  width: 100%;
}
</style>