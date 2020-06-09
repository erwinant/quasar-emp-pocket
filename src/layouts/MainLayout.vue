<template>
  <q-layout view="lHh LpR fFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title>{{state.title}}</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" show-if-above bordered :breakpoint="600">
      <q-list>
        <q-toolbar class="bg-primary">
          <q-input
            dark
            dense
            standout
            v-model="searchKey"
            placeholder="Search..."
            class="full-width"
          >
            <template v-slot:prepend>
              <q-icon v-if="searchKey === ''" name="search"/>
              <q-icon v-else name="clear" class="cursor-pointer" @click="searchKey = ''"/>
            </template>
          </q-input>
        </q-toolbar>
        <LeftMenu :filter="searchKey"></LeftMenu>
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-page padding>
        <router-view></router-view>
      </q-page>
    </q-page-container>
    <!-- <q-footer reveal class="bg-grey-8 text-white">
      <q-toolbar>
      </q-toolbar>
    </q-footer>-->
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink";
import LeftMenu from "components/LeftMenu";
import { mapState, mapActions } from "vuex";
import { SET_CURRENT_PAGE } from "../store/general/action.type";
export default {
  name: "MainLayout",
  components: {
    EssentialLink,
    LeftMenu
  },
  mounted() {
    this.$store.dispatch(`general/${SET_CURRENT_PAGE}`, {
      title: this.$router.history.current.name,
      message: "re"
    });
  },
  data() {
    return {
      searchKey: "",
      leftDrawerOpen: false
    };
  },
  computed: {
    ...mapState("general", ["state"])
  }
};
</script>
