import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  id: string | null = null;
  passwd: string | null = null;
  confirm: string | null = null;

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  register() {
    this.auth.register(this.id, this.passwd).subscribe(data => {
      console.log(this.id, this.passwd);
    })
  }

}
