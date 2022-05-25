import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  id: string | null = null;
  passwd: string | null = null;
  constructor() { }

  ngOnInit(): void {
  }

  login() {
    console.log(this.id, this.passwd);
  }

}
