import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CustomerModel} from '../model/customerModel'
import { Observable } from 'rxjs';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  public getCustomers(): Observable<Array<CustomerModel>> {
    return this.http.get<Array<CustomerModel>>(environment.backendHost + '/customers');
  }

  public searchCustomers(keyword: string): Observable<Array<CustomerModel>> {
    return this.http.get<Array<CustomerModel>>(
      environment.backendHost + '/customers/search?keyword=' + keyword,
    );
  }

  public saveCustomer(customer: CustomerModel): Observable<CustomerModel> {
    return this.http.post<CustomerModel>(environment.backendHost + '/customers', customer);
  }

  public deleteCustomer(id: number){
    return this.http.delete(environment.backendHost+"/customers/"+id);
  }
}
