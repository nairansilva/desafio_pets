import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Owner from 'src/app/models/Owner';
import { AuthService } from 'src/app/services/auth.service';
import { OwnerService } from 'src/app/services/owner.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  userFound: Owner;
  
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService,
    private ownerService: OwnerService,
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    this.ownerService.getAll().subscribe(owners => {
      const isValid = this.authService.login(owners,this.email);

      if(isValid) {
        this.router.navigate(['/owner']);
      }
      else {
        this.toastService.showMessage('User/Password is incorrect');
      }
    });    
  }

}
