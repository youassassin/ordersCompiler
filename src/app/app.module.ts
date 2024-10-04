import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { ThinkMoveService } from './services/think-move.service';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { DatePipe } from '@angular/common';
import { GlobalsService } from './services/globals.service';
import { StripeService } from './services/stripe.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    ThinkMoveService,
    StripeService,
    GlobalsService,
    DatePipe,
    provideOAuthClient(),
    provideHttpClient(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
