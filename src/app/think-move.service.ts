import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThinkMoveService {
  //sp: 942622ac-1113-4ca3-8a9d-11472ba8330c
  //goog api: AIzaSyDmVS5OJmfFALiEaVWuQUsGb9cbwCQzVzc

  ordersUrl = '/squarespace/1.0/commerce/orders';
  header = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Access-Control-Allow-Methods': 'GET, POST',
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer 942622ac-1113-4ca3-8a9d-11472ba8330c',
  }

  requestOptions = {
    headers: new HttpHeaders(this.header),
  };
  constructor(private http: HttpClient) { }

  getOrders(): Observable<any> {
    return this.http.get(this.ordersUrl, this.requestOptions).pipe(map(data => {
      return data;
    }));
  }
  getNextOrders(cursor: string): Observable<any> {
    return this.http.get(this.ordersUrl + '?cursor=' + cursor, this.requestOptions).pipe(map(data => {
      return data;
    }));
  }
  getOrder(number: string): Observable<any> {
    return this.http.get(this.ordersUrl + '/' + number, this.requestOptions).pipe(map(data => {
      return data;
    }));
  }
}
