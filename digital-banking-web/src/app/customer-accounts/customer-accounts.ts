import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerModel} from "../model/customerModel";
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.html',
  imports: [JsonPipe],
  styleUrls: ['./customer-accounts.css'],
})
export class CustomerAccounts implements OnInit {
  customerId!: string;
  customer!: CustomerModel;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.customer = this.router.getCurrentNavigation()?.extras.state as CustomerModel;
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];
  }
}
