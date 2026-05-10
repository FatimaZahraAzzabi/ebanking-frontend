import { Routes } from '@angular/router';
import { Customers } from './customers/customers';
import { Accounts } from './accounts/accounts';
import { NewCustomerComponent } from './new-customer/new-customer';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerAccounts } from './customer-accounts/customer-accounts';
import {Login} from './login/login';
import { AdminTemplate } from './admin-template/admin-template';
import { AuthenticationGuard } from './guards/authentication-guard';
import { AuthorizationGuard } from './guards/authorization-guard';
import { NotAuthorized } from './not-authorized/not-authorized';

export const routes: Routes = [
  {path:"login",component:Login},
  {path:"",redirectTo:"/login",pathMatch:"full"},
  {path:"admin",component:AdminTemplate,canActivate:[AuthenticationGuard],children:[
      { path :"customers", component : Customers},
      { path :"accounts", component : Accounts},
      { path :"new-customer", canActivate:[AuthorizationGuard],data:{role:"ADMIN"},component : NewCustomerComponent},
      { path :"customer-accounts/:id", component : CustomerAccounts},
      {path:"notAuthorized",component:NotAuthorized}
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
