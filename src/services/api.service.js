import Vue from "vue"
import axios from "axios"
import VueAxios from "vue-axios"
import { config } from "../../config"
import JwtService from './jwt.service'

const ApiService = {
    init() {
        Vue.use(VueAxios, axios);
        Vue.axios.defaults.baseURL = config.$api_url;
    },
    setHeader() {
        Vue.axios.defaults.headers.common["Authorization"] = JwtService.getToken();
    },
    query(resource, params) {
        return Vue.axios.get(resource, params).catch(error => {
            throw new Error(`ApiService ${error}`);
        });
    },
    getPlain(resource) {
        return Vue.axios.get(`${resource}`).catch(error => {
            throw new Error(`ApiService ${error}`);
        });
    },
    get(resource, slug = "") {
        return Vue.axios.get(`${resource}/${slug}`).catch(error => {
            throw new Error(`ApiService ${error}`);
        });
    },
    post(resource, params) {
        return Vue.axios.post(`${resource}`, params);
    },
    post_multipart(resource, params) {
        return Vue.axios.post(`${resource}`, params,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          });
    },
    update(resource, slug, params) {
        return Vue.axios.put(`${resource}/${slug}`, params);
    },

    put(resource, params) {
        return Vue.axios.put(`${resource}`, params);
    },

    delete(resource) {
        return Vue.axios.delete(resource).catch(error => {
            throw new Error(`ApiService ${error}`);
        });
    }
};

export default ApiService;