import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  portalUrl = 'https://localhost:7258';

  constructor(
    private http: HttpClient
  ) { }

  public createTransaction(bill: any): Promise<any> {
    return this.http.post(`${this.portalUrl}/RabbitMq`, bill).toPromise();
  }

  public getProducts(): Promise<any> {
    return this.http.get(`${this.portalUrl}/Product`).toPromise();
  }

  public getCustomers(): Promise<any> {
    return this.http.get(`${this.portalUrl}/Customer`).toPromise();
  }
}