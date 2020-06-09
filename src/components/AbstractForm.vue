<template>
  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md" ref="absForm">
    <div v-for="field in localFields" :key="field.key">
      <q-input
        v-if="field.type==='text'"
        square
        outlined
        v-model="field.value"
        :label="field.label"
        lazy-rules
        :rules="[val=>attachValidator(val, field.validator)]"
      />
      <q-select
        v-if="field.type==='dropdown'"
        square
        outlined
        v-model="field.value"
        :options="field.options"
        :label="field.label"
        emit-value
        :rules="[val=>attachValidator(val, field.validator)]"
      />
      <div v-if="field.type==='radio'">
        <div>{{field.label}} :</div>
        <q-option-group
          inline
          v-if="field.type==='radio'"
          :options="field.options"
          :label="field.label"
          type="radio"
          v-model="field.value"
          :rules="[val=>attachValidator(val, field.validator)]"
        />
      </div>
      <q-input
        v-if="field.type==='textarea'"
        v-model="field.value"
        square
        :label="field.label"
        outlined
        type="textarea"
        :rules="[val=>attachValidator(val, field.validator)]"
      />
      <q-input
        v-if="field.type==='textdate'"
        square
        outlined
        :label="field.label"
        v-model="field.value"
        mask="date"
        :rules="['date']"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy :ref="field.key" transition-show="scale" transition-hide="scale">
              <q-date v-model="field.value" @input="() => $refs[field.key][0].hide()"/>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-toggle v-if="field.type==='toggle'" v-model="field.value" :label="field.label" left-label/>
    </div>
    <div class="q-mb-md" align="right">
      <q-btn label="Save" type="submit" icon="check" color="primary"/>
      <q-btn v-if="disableReset" label="Reset" type="reset" color="primary" flat class="q-ml-sm"/>
      <q-btn label="Cancel" type="button" color="primary" outline class="q-ml-sm" @click="onCancel"/>
    </div>
  </q-form>
</template>
<script>
import { Validator } from "../helper/Common";
export default {
  props: {
    fields: null,
    disableReset: false
  },
  computed: {
    localFields: {
      get() {
        return this.fields;
      },
      set(value) {
        return value;
      }
    }
  },
  methods: {
    attachValidator(val, validator) {
      return Validator.revealValidator(val, validator);
    },
    onSubmit() {
      this.$emit("handle-change-form", this.fields);
    },
    onReset() {
      this.localFields = this.localFields.map(m => {
        m.value = "";
        return m;
      });
    },
    onCancel(){
      this.$emit("handle-cancel-form", this.fields);
    }
  }
};
</script>