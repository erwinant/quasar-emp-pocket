<template>
<div>
  <q-expansion-item group="exp-group" expand-separator
  :label="section"
  header-class="bg-grey-1 text-primary text-bold"
  expand-icon-class="text-primary">
    <q-card >
      <q-card-section>
      <AbstractForm :fields="fields" @handle-change-form="handleChangeForm" @handle-cancel-form="handleCancelForm" v-if="editMode"/>
      <DataDisplayer :fields="fields" @handle-edit="handleEditForm"  v-if="!editMode"/>
      </q-card-section>
    </q-card>
  </q-expansion-item>
   <q-separator />
   </div>
</template>
<script>
import AbstractForm from "./AbstractForm"
import DataDisplayer from "./DataDisplayer"
export default {
  data(){
    return{
      editMode:false
    }
  },
  props: {
    section: "",
    fields: null
  },
  components:{AbstractForm,DataDisplayer},
  methods:{
    handleChangeForm(eventValue){
      this.editMode = false;
      this.$emit("handle-change-expansion-group-form", eventValue)
    },
    handleEditForm(eventValue){
      this.editMode = true
    },
    handleCancelForm(eventValue){
      this.editMode = false
    }
  }
};
</script>
