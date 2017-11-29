import axios from 'axios'
import {BASE_URL} from '../const'

const instance = axios.create({
  baseURL: BASE_URL
})
const TOKEN = 'token';

function handleResponse(data) {
  switch (data.statusCode) {
    case 200:
      return Promise.resolve(data);
    default:
      return Promise.reject(data)
  }
}

function handleErr(data) {
  console.log(data.statusCode)
}

export default class HttpResource {
  static install(Vue) {
    Vue.prototype.$httpPost = this.httpPost.bind(this);
    Vue.prototype.$httpGet = this.httpGet.bind(this);
  }

  static httpGet(url, params) {
    return instance.get(url, {params: params}).then(({data}) => {
      return handleResponse(data);
    }, err => {
      return handleErr(err);
    })
  }

  static httpPost(url, params) {
    let formData = params;
    if (!(params instanceof FormData)) {
      formData = new FormData();
      for (let key of Object.keys(params)) {
        formData.append(key, params[key] !== null ? params[key] : '')
      }
      return instance.post(url, formData).then(({data}) => {
        return handleResponse(data)
      }, err => {
        return handleErr(err)
      })
    }
  }
}
