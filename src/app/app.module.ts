import {DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTableModule} from "@angular/material/table";
import {UseCaseModule} from "../use-case/use-case.module";
import {CdkTableModule} from '@angular/cdk/table';
import {registerLocaleData} from '@angular/common';
import localePt from '@angular/common/locales/pt';
import {NgChartsModule} from 'ng2-charts';
import {AssetVariationLineChartComponent} from './asset-variation-line-chart/asset-variation-line-chart.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatProgressBarModule} from "@angular/material/progress-bar";

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    AssetVariationLineChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UseCaseModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTableModule,
    CdkTableModule,
    NgChartsModule,
    MatProgressBarModule,
    FlexLayoutModule
  ],
  providers: [{provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL'},
    {provide: LOCALE_ID, useValue: 'pt-BR'}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
