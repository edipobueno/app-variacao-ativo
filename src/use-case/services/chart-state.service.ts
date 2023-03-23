import {Injectable} from '@angular/core';
import {UseCaseModule} from "../use-case.module";
import {QuotationsService} from "../../domain/repositories/quotations.service";
import {BehaviorSubject, Observable} from "rxjs";
import {QuotationViewModel} from "../view-models/quotation.view-model";

@Injectable({
  providedIn: UseCaseModule
})
export class ChartStateService {

  private dataSourceSubject: BehaviorSubject<QuotationViewModel[]>;

  constructor(
    private quotationsService: QuotationsService
  ) {
    this.dataSourceSubject = new BehaviorSubject<QuotationViewModel[]>([]);
  }

  public getDataSource(): Observable<QuotationViewModel[]> {
    return this.dataSourceSubject.asObservable();
  }

  public loadChart(): void {
    this.quotationsService.getQuotations('PETR4.SA', this.getThirtyDaysAgo(), new Date()).subscribe(
      quotations => {
        var dataSource: QuotationViewModel[] = [];
        var firstItem: boolean = true;
        var previousValue = 0;
        for (var i = 0; i < quotations.length; i++) {
          var quotation = quotations[i];
          if (firstItem) {
            previousValue = quotation.open;
            firstItem = false;
          }
          console.log(quotation.day);
          console.log(1 - (quotation.open / previousValue));

          dataSource.push({
            ...quotation,
            openVariationD1: 1 - (quotation.open / previousValue)
          });
          previousValue = quotation.open;
        }

        this.dataSourceSubject.next(dataSource);
      }
    );
  }

  private getThirtyDaysAgo(): Date {
    return new Date(new Date().getTime() - (30 * 24 * 60 * 60 * 1000));
  }
}
