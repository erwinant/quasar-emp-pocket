

import ApiService from './api.service'
const endpoint = "profile" //mongo
//const endpoint = "users" //mysql version
export default {
    postProfile: async (profile) => {
        let myPromise = await ApiService.post(`${endpoint}/`, profile);
        return myPromise
    },
    fetchProfileField: async () => {
        let myPromise = await ApiService.get(`${endpoint}/field`);
        return myPromise
    },
    fetchProfile: async (userName) => {
        let myPromise = await ApiService.get(`${endpoint}`, userName);
        return myPromise
    },
    uploadProfilePicture: async (userName,formMultipart) => {
        let myPromise = await ApiService.post(`${endpoint}/upload/${userName}`, formMultipart);
        return myPromise
    }
}