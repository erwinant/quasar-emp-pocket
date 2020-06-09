import UserService from '../../services/user.service'
import JwtService from '../../services/jwt.service'
import { SET_AUTH, PURGE_AUTH, SET_ERROR } from './mutation.type'
import { LOGOUT, LOGIN, CHECK_AUTH } from './action.type'
import { SHOW_ALERT } from '../alert/action.type'
import router from '../../router';
export default {
  [LOGIN]: ({ dispatch, commit }, credential) => {
    return new Promise((resolve, reject) => {
      UserService.login(credential).then(({ data }) => {
        commit(SET_AUTH, data)
        dispatch(`alert/${SHOW_ALERT}`, { title: "Login Success", message: "Directing...", type: "positive" }, { root: true })
        resolve(data)
      }).catch(err => {
        if (err.response) {
          commit(SET_ERROR, err.response.data.message)
          dispatch(`alert/${SHOW_ALERT}`, { title: "Login Failed", message: err.response.data.message, type: "negative" }, { root: true })
          reject(err)
        }
        else {
          commit(SET_ERROR, "Undefined error.")
          reject("Undefined error.")
        }
      })
    })
  },
  [LOGOUT]: ({ commit, dispatch }) => {
    commit(PURGE_AUTH)
    dispatch(`alert/${SHOW_ALERT}`, { title: "Logged out", message: "Locking...", type: "warning" }, { root: true })
  },
  [CHECK_AUTH]: ({ commit }) => {
    if (JwtService.getToken()) {
      UserService.checkAuth().then(({ data }) => {
        commit(SET_AUTH, data)
      }).catch(err => {
        commit(PURGE_AUTH)
        router().push('/login')
      });
    } else {
      commit(PURGE_AUTH)
    }
  },
}