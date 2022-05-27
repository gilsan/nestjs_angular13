import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  id: string | null = null;
  passwd: string | null = null;
  constructor(
  auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  login() {
    console.log(this.id, this.passwd);
  }

}
