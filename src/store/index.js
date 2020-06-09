import Vue from 'vue'
import Vuex from 'vuex'

// we first import the module
import auth from './auth'
import alert from './alert'
import general from './general'

import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // then we reference it
      auth, alert, general
    },
    plugins: [
      createPersistedState({
        storage: {
          getItem: (key) => Cookies.get(key),
          setItem: (key, value) =>
            Cookies.set(key, value, { expires: 3 }),
          removeItem: (key) => Cookies.remove(key),
        }
      })
    ]
    // enable strict mode (adds overhead!)
    // for dev mode only
    //strict: process.env.DEV
  })

  /*
    if we want some HMR magic for it, we handle
    the hot update like below. Notice we guard this
    code with "process.env.DEV" -- so this doesn't
    get into our production build (and it shouldn't).
  */

  //   if (process.env.DEV && module.hot) {
  //     module.hot.accept(['./showcase'], () => {
  //       const newShowcase = require('./showcase').default
  //       Store.hotUpdate({ modules: { showcase: newShowcase } })
  //     })
  //   }

  return Store
}