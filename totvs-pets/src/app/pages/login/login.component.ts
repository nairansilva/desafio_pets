import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JwtTokenService } from 'src/app/services/jwt-token.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input()
  user = {
    email: '',
    password: ''
  }

  constructor(private loginHttp: HttpClient, private jwtToken: JwtTokenService,private router: Router, private auth: AuthService) { }

  ngOnInit(): void {}

  async login() {
    const data: any = await this.loginHttp.post("http://167.71.83.238/sessions",this.user).toPromise()
    if(data.token){
      this.auth.check = true;
      this.jwtToken.token = data.token;
      this.router.navigate(['owners']);
    }
  }
}
