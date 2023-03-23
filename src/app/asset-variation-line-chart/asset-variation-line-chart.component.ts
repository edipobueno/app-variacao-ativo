import {Component, OnDestroy} from '@angular/core';
import {ChartType, ChartConfiguration} from "chart.js";
import {ChartStateService} from "../../use-case/services/chart-state.service";
import {Observable, Subscription} from "rxjs";
import {QuotationViewModel} from "../../use-case/view-models/quotation.view-model";
import {formatDate} from "@angular/common";

@Component({
  selector: 'va-asset-variation-line-chart',
  templateUrl: './asset-variation-line-chart.component.html',
  styleUrls: ['./asset-variation-line-chart.component.scss']
})
export class AssetVariationLineChartComponent implements OnDestroy {

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: []
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      y:
        {
          position: 'left',
        },
      y1: {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red'
        }
      }
    }
  };

  public lineChartType: ChartType = 'line';

  private dataSource$: Observable<QuotationViewModel[]>;
  private dataSourceSubscription: Subscription;

  constructor(
    private chartService: ChartStateService
  ) {
    this.dataSource$ = this.chartService.getDataSource();
    this.dataSourceSubscription = this.dataSource$.subscribe(quotations => {
      var labels = quotations.map(quotation => formatDate(quotation.day, 'dd/MM/yyyy', 'pt-BR'));
      var datasets = [];
      // datasets.push({
      //   data: quotations.map(quotation => quotation.open),
      //   label: 'Valor',
      //   backgroundColor: 'rgba(148,159,177,0.2)',
      //   borderColor: 'rgba(148,159,177,1)',
      //   pointBackgroundColor: 'rgba(148,159,177,1)',
      //   pointBorderColor: '#fff',
      //   pointHoverBackgroundColor: '#fff',
      //   pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      //   fill: 'origin',
      // });

      datasets.push({
        data: quotations.map(quotation => quotation.openVariation * 100),
        label: 'Variação com a data inicial',
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      });

      datasets.push({
        data: quotations.map(quotation => quotation.openVariationD1 * 100),
        label: 'Variação com D-1',
        backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      });

      this.lineChartData = {
        datasets: datasets,
        labels: labels
      };
    })
  }

  ngOnDestroy(): void {
    this.dataSourceSubscription.unsubscribe();
  }
}
