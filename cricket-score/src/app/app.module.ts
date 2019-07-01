import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LiveScoreComponent } from './live-score/live-score.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ChartModule } from 'angular2-highcharts';
import * as highcharts from 'Highcharts';

@NgModule({
  declarations: [
    AppComponent,
    LiveScoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartModule.forRoot(highcharts)
  ],
  providers: [HttpClient,HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
