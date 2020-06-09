import ApiService from './api.service'
export default {
  fetchMenu: async (roleId) => {
    let myPromise = await ApiService.get(`menu/${roleId}`);
    return myPromise
  }
}