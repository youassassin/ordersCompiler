import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthGoogleService } from './services/auth-google.service';

@Injectable({
  providedIn: 'root'
})
export class ThinkMoveService {
  //sp: d0a9b13b-86d0-4f3a-aae5-0ccfcec73a0d
  //goog api: AIzaSyDmVS5OJmfFALiEaVWuQUsGb9cbwCQzVzc

  ordersUrl = '/squarespace/1.0/commerce/orders';
  productsUrl = '/squarespace/1.0/commerce/products';
  sheetsUrl = '/google/v4/spreadsheets';
  rawDataId = '647471555';
  DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';
  GAPI = 'AIzaSyDmVS5OJmfFALiEaVWuQUsGb9cbwCQzVzc';
  SCOPE = [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive.file'
  ];
  SHEETS_ID = '1zzbGWnHtvWkZsvmEAy4iCPZmC_i-y4EX72RASEHBzfE';

  // jwt = new JWT({
  //   email: creds.client_email,
  //   key: creds.private_key,
  //   scopes: this.SCOPE,
  // });

  // doc = new GoogleSpreadsheet(this.SHEETS_ID, this.jwt);

  header = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Access-Control-Allow-Methods': 'GET, POST',
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer d0a9b13b-86d0-4f3a-aae5-0ccfcec73a0d',
  }
  headerG = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Access-Control-Allow-Methods': 'GET, POST, PUT',
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer ',
  }

  http = inject(HttpClient);
  authService = inject(AuthGoogleService);

  public static SESSION_STORAGE_KEY: string = 'accessToken';
  private user: any;


  public getToken(): string | null {
    let token: string | null = sessionStorage.getItem(ThinkMoveService.SESSION_STORAGE_KEY);
    if (!token) {
      throw new Error("no token set , authentication required");
    }
    return sessionStorage.getItem(ThinkMoveService.SESSION_STORAGE_KEY);
  }

  private signInSuccessHandler(res: any) {
    this.user = res;
    sessionStorage.setItem(
      ThinkMoveService.SESSION_STORAGE_KEY, res.getAuthResponse().access_token
    );
  }

  getOrders(): Observable<any> {
    return this.http.get(this.ordersUrl, { headers: new HttpHeaders(this.header) }).pipe(map(data => {
      return data;
    }));
  }

  getNextOrders(cursor: string): Observable<any> {
    return this.http.get(this.ordersUrl + '?cursor=' + cursor, { headers: new HttpHeaders(this.header) }).pipe(map(data => {
      return data;
    }));
  }
  getOrder(number: string): Observable<any> {
    return this.http.get(this.ordersUrl + '/' + number, { headers: new HttpHeaders(this.header) }).pipe(map(data => {
      return data;
    }));
  }
  setData(request: any) {
    this.headerG['Authorization'] = 'Bearer ' + this.authService.getToken();
    const valueInputOption = 'RAW';
    return this.http.put<any>(
      this.sheetsUrl + '/' + this.SHEETS_ID + '/values/' + request.range + '?valueInputOption=' + valueInputOption,
      request, { headers: new HttpHeaders(this.headerG) }
    ).pipe(map(data => {
      return data;
    }));
  }
}
