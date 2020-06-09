<template>
  <q-item clickable @click="clickedLink()">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import {mapActions} from 'vuex'
import { SET_CURRENT_PAGE } from '../store/general/action.type'
export default {
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    linkName: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    }
  },
  methods:{
    ...mapActions("general", [SET_CURRENT_PAGE]),
    clickedLink(){
      this[SET_CURRENT_PAGE]({title:this.title, message:this.caption})
      this.$router.push({name:this.linkName}).catch(err=>{
        if(err.message === "NavigationDuplicated"){
          return;
        }
      })
    }
  }
}
</script>
