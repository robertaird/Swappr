/* eslint no-undef:0 */

import auth0 from 'auth0-js';
import EventEmitter from 'EventEmitter';
import { AUTH_CONFIG } from './auth0-variables';
import router from './../router';
import userService from '../services/createUser';

export default class AuthService {
  authenticated = this.isAuthenticated();
  authNotifier = new EventEmitter();

  constructor() {
    this.login = this.login.bind(this);
    this.setSession = this.setSession.bind(this);
    this.logout = this.logout.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    responseType: 'token id_token',
    scope: 'openid profile email',
  })
  login() {
    this.auth0.authorize();
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify(
      (authResult.expiresIn * 1000) + new Date().getTime(),
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    this.auth0.client.userInfo(authResult.accessToken, (issue, userInfo) => {
      if (issue) {
        console.error(issue);
      }
      const { email, sub, given_name } = userInfo;
      const idGoogle = sub.slice(userInfo.sub.indexOf('|') + 1);
      const user = {
        name: given_name,
        id_facebook: idGoogle,
        email,
      };
      userService.createUser(user)
      .then(({ data: { id } }) => {
        localStorage.setItem('userId', id);
        this.authNotifier.emit('authChange', { authenticated: true });
      }).then(() => {
        router.replace('main');
      }).catch((err) => {
        console.error(err);
        router.replace('main');
      });
    });
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        router.replace('main');
        console.error(err);
      }
    });
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('userId');
    this.userProfile = null;
    this.authNotifier.emit('authChange', false);
    // navigate to the home route
    router.replace('/');
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    this.expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < this.expiresAt;
  }
}
