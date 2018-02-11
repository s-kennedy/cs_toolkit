import logo from '../assets/img/STC_Logo_Horiz.png'

export default class AuthService {
  loggedIn() {
    const token = this.getToken();
    if (!token) { return false }

    const decodedToken = this.decodeToken();
    const expiry = decodedToken.exp;
    const currentTimestamp = Math.round(+new Date / 1e3);
    return expiry >= currentTimestamp;
  }

  setToken(accessToken) {
    localStorage.setItem('stc_toolkit_access_token', accessToken)
  }

  getToken() {
    return localStorage.getItem('stc_toolkit_access_token')
  }

  logout() {
    localStorage.removeItem('stc_toolkit_access_token');
  }

  decodeToken() {
    const token = localStorage.getItem('stc_toolkit_access_token')
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

  rolesFromToken() {
    const decodedToken = this.decodeToken();
    return decodedToken['https://savethechildren.net/roles'];
  }
}