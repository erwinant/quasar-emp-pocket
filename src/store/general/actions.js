import { SAVE_CURRENT_PAGE, CLEAR_CURRENT_PAGE, SAVE_LEFT_MENU, CLEAR_LEFT_MENU } from './mutation.type'
import { SET_CURRENT_PAGE, UNSET_CURRENT_PAGE, SET_LEFT_MENU, UNSET_LEFT_MENU } from './action.type'
import generalService from "../../services/general.service";
import { SHOW_ALERT } from '../alert/action.type';
import { LOGOUT } from '../auth/action.type';
export default {
  [SET_CURRENT_PAGE]: ({ commit }, payload) => {
    commit(SAVE_CURRENT_PAGE, payload)
  },
  [UNSET_CURRENT_PAGE]: ({ commit }) => {
    commit(CLEAR_CURRENT_PAGE)
  },
  [SET_LEFT_MENU]: ({ commit, rootState, dispatch }, payload) => {
    if (rootState.auth.state.authData.auth) {
      generalService
        .fetchMenu(rootState.auth.state.authData.role)
        .then(({ data }) => {
          if (data) {
            commit(SAVE_LEFT_MENU, data)
          }
        })
        .catch(err => {
          console.log(err);
        });
    }else{
      dispatch(`alert/${SHOW_ALERT}`, { title: "Authentication Failed", message: err.response.data.message, type: "negative" }, { root: true })
      dispatch(`auth/${LOGOUT}`, {root: true})
    }
  },
  [UNSET_LEFT_MENU]: ({ commit }) => {
    commit(CLEAR_LEFT_MENU)
  }
}