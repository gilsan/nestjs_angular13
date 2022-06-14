import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../services/auth.service';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  id: string | null = null;
  passwd: string | null = null;

  constructor(
     private auth: AuthService,
     private messageService: MessageService,
     private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(

  ) {



    this.auth.login(this.id, this.passwd).subscribe({
      next: (data) => {
        this.messageService.add({severity:'success', summary:'메세지', detail:'로그인 되었습니다.'});
        this.router.navigate(['/home']);
      },
      error: (error) => {

        this.messageService.add({severity:'error', summary:'메세지', detail:'없는 계정 입니다.'});
      }
    }

    );



  }

}
