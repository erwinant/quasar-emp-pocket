<template>
  <q-table v-if="columns" :data="data" :columns="columns"
  @row-click="handleClickRow" :row-key="rowKey" :filter="filter" hide-bottom>
    <template v-slot:top-left>
      <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
        <template v-slot:append>
          <q-icon name="search"/>
        </template>
      </q-input>
    </template>
  </q-table>
</template>
<script>
export default {
  props: {
    data: null,
    columns: null,
    rowKey: ""
  },
  data() {
    return {
      filter: ""
    };
  },
  methods:{
    handleClickRow(ev,row){
      this.$emit("handle-click-row",ev,row)
    }
  }
};
</script>