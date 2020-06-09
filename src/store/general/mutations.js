import { CLEAR_CURRENT_PAGE,SAVE_CURRENT_PAGE, SAVE_LEFT_MENU, CLEAR_LEFT_MENU } from "./mutation.type"
export default {
    [SAVE_CURRENT_PAGE]: ({ state }, {title,message}) => {
        state.title = title
        state.message = message
    },
    [CLEAR_CURRENT_PAGE]: ({ state }) => {
        state.title = ""
        state.message = ""
    },
    [SAVE_LEFT_MENU]: ({ state }, leftmenu) => {
        state.leftMenu = leftmenu
    },
    [CLEAR_LEFT_MENU]: ({ state }) => {
        state.leftMenu = []
    }
}