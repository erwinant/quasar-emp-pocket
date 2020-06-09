import { SET_ALERT, CLEAR_ALERT } from "./mutation.type"
export default {
    [SET_ALERT]: ({ state }, {title,message,type}) => { //use {state} for accesssing state property on state because it use export default method
        state.title = title
        state.message = message
        state.type = type
    },
    [CLEAR_ALERT]: ({ state }) => {
        state.title = ""
        state.message = ""
        state.type = ""
    }
}