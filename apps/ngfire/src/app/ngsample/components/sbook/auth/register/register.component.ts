import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  id: string | null = null;
  passwd: string | null = null;
  constructor() { }

  ngOnInit(): void {
  }

  register() {
    console.log(this.id, this.passwd);
  }

}
