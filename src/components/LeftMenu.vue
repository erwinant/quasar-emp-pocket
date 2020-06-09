<template>
  <div class="q-pa-sm q-gutter-sm">
    <q-tree :nodes="state.leftMenu" node-key="label" :filter="filter" :selected.sync="selected">
      <template v-slot:default-header="prop">
        <div
          class="row items full-width cursor-pointer text-subtitle1"
          @click="goTo(prop.node.linkName, prop.node.label)"
          :class="selected === prop.node.label ? 'selected' : 'text-primary'"
        >
          <q-icon size="1.5rem" :name="prop.node.icon" class="q-mr-sm"/>
          <div>{{ prop.node.label }}</div>
        </div>
      </template>
    </q-tree>
  </div>
</template>
<script>
import generalService from "../services/general.service";
import { mapActions, mapState } from "vuex";
import { SET_CURRENT_PAGE, SET_LEFT_MENU } from "../store/general/action.type";
export default {
  props: {
    filter: ""
  },
  data() {
    return {
      selected: "Landing",
      //menuTree: [] //this action taken by vuex variable
    };
  },
  computed: {
    // ...mapState({myTree:state => state.general.state.leftMenu}) //long way
    //...mapState('general',{myTree: s=>{console.log(s)}})
    ...mapState("general", ["state"])
    //shortway
  },
  mounted() {
    //this action taken by vuex
    // generalService
    //   .fetchMenu("reguler")
    //   .then(({ data }) => {
    //     if (data) {
    //       this.menuTree = data;
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    this[SET_LEFT_MENU]();
    //this.menuTree = this.state.leftMenu;
  },
  methods: {
    ...mapActions("general", [SET_CURRENT_PAGE]),
    ...mapActions("general", [SET_LEFT_MENU]),
    resetFilter() {
      this.filter = "";
      this.$refs.filter.focus();
    },
    goTo(linkName, forceLabel) {
      setTimeout(() => {
        if (this.selected == null) this.selected = forceLabel;
      }, 200);
      if (linkName) {
        this[SET_CURRENT_PAGE]({ title: linkName, message: linkName });
        this.$router.push({ name: linkName }).catch(err => {
          if (err.message === "NavigationDuplicated") {
            return;
          }
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.selected {
  color: $primary;
  background: linear-gradient(
    90deg,
    $fourth 50%,
    #fff 95%
  );
  // background: linear-gradient(
  //   90deg,
  //   rgba(32, 80, 114, 1) 50%,
  //   rgba(255, 255, 255, 1) 95%
  // );
  border-radius: 5px;
}
</style>