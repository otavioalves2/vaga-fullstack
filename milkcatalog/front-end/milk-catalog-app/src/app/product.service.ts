import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = "http://localhost:8080/product"

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.baseUrl}`);
  }

  getProductsByFilter(filter: any): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.baseUrl}` + "/" + filter);
  }
  
  create(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  update(code: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${code}`, data);
  }

  delete(code: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${code}`);
  }
}
