import { SET_AUTH, PURGE_AUTH, SET_ERROR } from "./mutation.type"
import JwtService from '../../services/jwt.service'
export default {
    [SET_AUTH]: ({ state }, authData) => { //use {state} for accesssing state property on state because it use export default method
        state.authData = authData
        JwtService.saveToken(state.authData.token);
    },
    [PURGE_AUTH]: ({ state }) => {
        state.isAuthenticated = false;
        state.authData = {};
        state.errors = null;
        JwtService.destroyToken();
    },
    [SET_ERROR]: ({ state }, errorMessage)=>{
        state.errors = errorMessage
    }
}