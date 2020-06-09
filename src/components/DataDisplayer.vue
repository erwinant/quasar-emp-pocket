<template>
  <div>
    <div v-for="field in fields" :key="field.key" class="q-pa-sm">
      <div>
        <label class="text-subtitle1 text-primary">{{field.label}}</label>
      </div>
      <div>
        <label class="text-caption">{{field.value || "-"}}</label>
      </div>
    </div>
    <div class="q-mb-md" align="right">
      <q-btn label="Edit" type="button" outline color="primary" @click="handleEdit"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    fields: null,
    disableReset: false
  },
  methods:{
      handleEdit(){
          this.$emit("handle-edit", this.fields)
      }
  }
};
</script>