import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Phone, PhoneDetail } from './phone';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhoneService {
  private baseUrl = 'http://localhost:80';

  constructor(private http: HttpClient) { }

  getPhones(): Observable<Phone[]> {
    return this.http.get<Phone[]>(`${this.baseUrl}/phones`);
  }

  getPhoneDetail(phoneId: string): Observable<PhoneDetail> {
    return this.http.get<PhoneDetail>(`${this.baseUrl}/phones/${phoneId}`);
  }
}
