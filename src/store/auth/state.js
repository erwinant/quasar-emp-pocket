import JwtService from '../../services/jwt.service'
export default {
  state: {
    errors: null,
    authData: {},
    isAuthenticated: !!JwtService.getToken()
  }
}