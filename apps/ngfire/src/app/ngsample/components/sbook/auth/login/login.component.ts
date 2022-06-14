import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  id: string | null = null;
  passwd: string | null = null;

  constructor(
     private auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  login() {

    this.auth.login(this.id, this.passwd).subscribe(data => {
      console.log(data);
    })
  }

}
