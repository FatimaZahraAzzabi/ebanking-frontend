import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer'
import { CustomerModel } from '../model/customerModel'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { catchError, Observable ,throwError,map } from 'rxjs';
import {Router} from "@angular/router";
import {CommonModule} from '@angular/common';

// @ts-ignore
@Component({
  selector: 'app-customers',
  templateUrl: './customers.html',
  imports: [
    CommonModule,              // ← Pour *ngIf et *ngFor
    ReactiveFormsModule,       // Pour formGroup
  ],
  styleUrl: './customers.css',
})
export class Customers implements OnInit {
  customers!: Observable<Array<CustomerModel>>;
  errorMessage!:string ;
  searchFormGroup:FormGroup | undefined;
  constructor(private customerService: CustomerService , private fb : FormBuilder,private router : Router) {}

  ngOnInit() {
    this. searchFormGroup=this.fb.group({
      keyword:this.fb.control("")
    });
    this.customers=this.customerService.getCustomers().pipe(
      catchError(err=>{
           this.errorMessage=err.message;
           return throwError(err);
      })
    );
  }

  handleSearchCustomers(){
      let kw=this.searchFormGroup?.value.keyword;
      this.customers=this.customerService.searchCustomers(kw).pipe( catchError(err=>{
          this.errorMessage=err.message;
          return throwError(err);
        })
      );
  }

  handleDeleteCustomer(c: CustomerModel) {
    let conf = confirm("Are you sure?");
    if(!conf) return;
    this.customerService.deleteCustomer(c.id).subscribe({
      next : (resp) => {
        this.customers=this.customers.pipe(
          map(data=>{
            let index=data.indexOf(c);
            data.slice(index,1)
            return data;
          })
        );
      },
      error : err => {
        console.log(err);
      }
    })
  }

  handleCustomerAccounts(customer: CustomerModel) {
    this.router.navigateByUrl("/customer-accounts/"+customer.id,{state :customer});
  }

}
