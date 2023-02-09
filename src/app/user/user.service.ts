import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiKey = 'nadiatushimanordin@gmail.com';
  constructor(private httpClient: HttpClient) {}

  public getUserById(id: any) {
    let headers = new HttpHeaders({ 'API-KEY': `${this.apiKey}` });
    return this.httpClient.get<UserModel>(`/api/user/${id}`, { headers: headers });
  }

  public updateUserDetail(obj: UserModel) {
    let headers = new HttpHeaders({ 'API-KEY': `${this.apiKey}` });
    return this.httpClient.put<UserModel>(`/api/user/${obj.id}`, obj, { headers: headers });
  }
}
