import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private http = inject(HttpClient);
  baseUrl = '/stripe/v1'
  chargesUrl = this.baseUrl + '/charges?limit=100';
  balanceTransactionsUrl = this.baseUrl + '/balance_transactions?limit=100';
  applicationFeesUrl = this.baseUrl + '/application_fees';
  header = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Access-Control-Allow-Methods': 'GET, POST',
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer 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',
  }

  getCharges(): Observable<any> {
    return this.http.get(this.chargesUrl, { headers: new HttpHeaders(this.header) }).pipe(map(data => {
      return data;
    }));
  }
  getNextCharges(cursor: string): Observable<any> {
    return this.http.get(this.chargesUrl + '&starting_after=' + cursor, { headers: new HttpHeaders(this.header) }).pipe(map(data => {
      return data;
    }));
  }
  getBalanceTransactions(): Observable<any> {
    return this.http.get(this.balanceTransactionsUrl, { headers: new HttpHeaders(this.header) }).pipe(map(data => {
      return data;
    }));
  }
  getNextBalanceTransactions(cursor: string): Observable<any> {
    return this.http.get(this.balanceTransactionsUrl + '&starting_after=' + cursor, { headers: new HttpHeaders(this.header) }).pipe(map(data => {
      return data;
    }));
  }
}
