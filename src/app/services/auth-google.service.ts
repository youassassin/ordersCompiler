import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {

  readonly CLIENT_ID = '191198197734-ubv9pq7dlgqp14hvtelqeuf5g2mvtddd.apps.googleusercontent.com';
  private oAuthService = inject(OAuthService);
  private router = inject(Router);

  constructor() {
    this.initConfiguration();
  }
  initConfiguration() {
    const authConfig: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: this.CLIENT_ID,
      redirectUri: window.location.origin,
      scope: 'openid profile email https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive.file',
    };
    this.oAuthService.configure(authConfig);
    this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin();
  }
  login() {
    this.oAuthService.initImplicitFlow();
  }
  logout() {
    this.oAuthService.revokeTokenAndLogout();
    this.oAuthService.logOut();
  }
  getProfile() {
    return this.oAuthService.getIdentityClaims();
  }
  getToken(): string {
    return this.oAuthService.getAccessToken();
  }
}
