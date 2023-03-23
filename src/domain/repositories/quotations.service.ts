import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {QuotationModel} from "../models/quotation.model";
import {DomainModule} from "../domain.module";

@Injectable({
  providedIn: DomainModule
})
export class QuotationsService {

  private baseUrl: string = environment.quotationsBaseUrl;

  constructor(
    private http: HttpClient
  ) {

  }

  public getQuotations(symbol: string, startsAt: Date, endsAt: Date): Observable<QuotationModel[]> {
    return this.http.get<QuotationModel[]>(`${this.baseUrl}assets/${symbol}/quotations?startsAt=${startsAt.getFullYear()}-${startsAt.getMonth() + 1}-${startsAt.getDate()}&endsAt=${endsAt.getFullYear()}-${endsAt.getMonth() + 1}-${endsAt.getDate()}&withVariation=true`);
  }

}
