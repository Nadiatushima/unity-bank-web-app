import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccountModel } from './account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  apiKey = 'nadiatushimanordin@gmail.com';
  id = 'e29d7d0d-1e68-498d-a35a-490a0fb4eae0';
  constructor(private httpClient: HttpClient) {}

  public transferMoney(obj: AccountModel) {
    let headers = new HttpHeaders({ 'API-KEY': `${this.apiKey}` });
    return this.httpClient.post<AccountModel>(`/api/transaction`, obj, { headers: headers });
  }

  public getAllAccountHistory(id: any) {
    let headers = new HttpHeaders({ 'API-KEY': `${this.apiKey}` });
    return this.httpClient.get<AccountModel>(`/api/transactions/${this.id}`, { headers: headers });
  }
}
