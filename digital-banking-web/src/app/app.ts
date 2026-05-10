import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Navbar} from './navbar/navbar';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppHttpInterceptor } from './interceptors/app-http-interceptor';
import { AuthService } from './services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ReactiveFormsModule],
  providers:[{
    provide:HTTP_INTERCEPTORS,useClass:AppHttpInterceptor,multi:true
  }],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css',
})


export class App implements OnInit {
  title = 'digital-banking-web';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.loadJwtTokenFromLocalStorage();
  }
}
