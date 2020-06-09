import { SET_ALERT, CLEAR_ALERT } from './mutation.type'
import { SHOW_ALERT, HIDE_ALERT } from './action.type'
export default {
  [SHOW_ALERT]: ({ commit }, payload) => {
    commit(SET_ALERT, payload)
  },
  [HIDE_ALERT]: ({ commit }) => {
    commit(CLEAR_ALERT)
  }
}