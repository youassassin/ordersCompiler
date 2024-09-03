import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
// import * as gapi from 'gapi';

@Injectable({
  providedIn: 'root'
})
export class ThinkMoveService {
  //sp: 942622ac-1113-4ca3-8a9d-11472ba8330c
  //goog api: AIzaSyDmVS5OJmfFALiEaVWuQUsGb9cbwCQzVzc

  ordersUrl = '/squarespace/1.0/commerce/orders';
  sheetsUrl = '/google/v4/spreadsheets';
  rawDataId = '647471555';
  DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';
  GAPI = 'AIzaSyDmVS5OJmfFALiEaVWuQUsGb9cbwCQzVzc';

  header = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Access-Control-Allow-Methods': 'GET, POST',
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer 942622ac-1113-4ca3-8a9d-11472ba8330c',
  }
  headerG = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Access-Control-Allow-Methods': 'GET, POST, PUT',
    'Access-Control-Allow-Origin': '*',
    'X-goog-api-key': 'AIzaSyDmVS5OJmfFALiEaVWuQUsGb9cbwCQzVzc',
  }


  constructor(private http: HttpClient) {
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
  setData(request: any): Observable<any> {
    const sheets = '1zzbGWnHtvWkZsvmEAy4iCPZmC_i-y4EX72RASEHBzfE';
    // await gapi.client.init({
    //   apiKey: this.GAPI,
    //   discoveryDocs: [this.DISCOVERY_DOC]
    // });
    return this.http.put(this.sheetsUrl + '/' + sheets + '/values/' + request.range, request, { headers: new HttpHeaders(this.headerG) }).pipe(map(data => {
      return data;
    }));
  }
}
