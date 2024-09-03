import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ThinkMoveService } from './think-move.service';
import { GoogleApiModule, NG_GAPI_CONFIG, NgGapiClientConfig } from 'ng-gapi';

let gapiClientConfig: NgGapiClientConfig = {
  client_id: '191198197734-ubv9pq7dlgqp14hvtelqeuf5g2mvtddd.apps.googleusercontent.com',
  discoveryDocs: ['https://analyticsreporting.googleapis.com/$discovery/rest?version=v4'],
  scope: [
    'https://www.googleapis.com/auth/spreadsheets.readonly',
    'https://www.googleapis.com/auth/spreadsheets'
  ].join(' ')
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),
  ],
  providers: [ThinkMoveService],
  bootstrap: [AppComponent]
})
export class AppModule { }
