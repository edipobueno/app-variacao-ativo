import {Component, OnInit} from '@angular/core';
import {ChartStateService} from "../use-case/services/chart-state.service";
import {Observable, Subscription} from "rxjs";
import {QuotationViewModel} from "../use-case/view-models/quotation.view-model";

@Component({
  selector: 'va-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public isLoading: boolean = true;
  public dataSource$: Observable<QuotationViewModel[]>;
  public dataSourceSubscription: Subscription;
  public displayedColumns: string[] = [
    'day',
    'date',
    'value',
    'variation-d1',
    'variation-init',
    'volume'
  ];

  constructor(
    private chartState: ChartStateService
  ) {
    this.dataSource$ = this.chartState.getDataSource();
    this.dataSourceSubscription = this.dataSource$.subscribe(quotations => {
      if (quotations.length != 0) {
        this.isLoading = false;
      }
    });
  }

  ngOnInit(): void {
    this.chartState.loadChart();
  }
}
