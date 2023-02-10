import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginidService {
  private responseId!: string;

  setResponseId(id: string) {
    this.responseId = id;
    localStorage.setItem('responseId', id);
  }

  getResponseId() {
    let s: any = localStorage.getItem('responseId');
    this.responseId = s;
    return this.responseId;
  }
}
