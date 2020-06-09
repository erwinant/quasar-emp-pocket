// import something here

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file

import { config } from '../../config'
import ApiService from '../services/api.service'
import JwtService from '../services/jwt.service'
import { CHECK_AUTH } from 'src/store/auth/action.type'

// we add it to Vue prototype
// so we can reference it in Vue files
// without the need to import axios

export default async ({ router, store, Vue }) => {
  // something to do
  Vue.prototype.$appConfig = config
  ApiService.init()
  await router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = JwtService.getToken();
    
    if (authRequired && !loggedIn) {
      return next({name:'login'});
    }else{
      Promise.all([store.dispatch(`auth/${CHECK_AUTH}`)]).then(next)
    }
  })
}


