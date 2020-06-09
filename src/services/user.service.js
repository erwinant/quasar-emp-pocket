

import ApiService from './api.service'
const endpoint = "user" //mongo
//const endpoint = "users" //mysql version
export default {
    login:async (credential)=>{
        let myPromise = await ApiService.post(`${endpoint}/login`, credential);
        return myPromise
    },
    checkAuth:async ()=>{
        ApiService.setHeader();  //every page loaded, then set the header authorization (easier way when hit rest in a page)
        let myPromise = await ApiService.post(`${endpoint}/validate_token`, {});
        return myPromise
    }
}