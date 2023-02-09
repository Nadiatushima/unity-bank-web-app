import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  apiKey = 'nadiatushimanordin@gmail.com';
  constructor(private httpClient: HttpClient) {}

  // to login
  login(user: any) {
    let headers = new HttpHeaders({ 'API-KEY': `${this.apiKey}` });
    return this.httpClient.post('/api/auth/login', user, { headers: headers });
  }

  // to logout
  logoutUser(user: any) {
    let headers = new HttpHeaders({ 'API-KEY': `${this.apiKey}` });
    return this.httpClient.post('/api/auth/logout', { loginId: user }, { headers: headers });
  }
}
