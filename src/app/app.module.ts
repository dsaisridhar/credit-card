import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// importing local modules
import { AppRoutingModule } from './app-routing.module';
import { CreditCardModule } from './credit-card/credit-card.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CreditCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
