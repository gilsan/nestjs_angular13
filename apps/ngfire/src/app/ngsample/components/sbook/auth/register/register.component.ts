import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../services/auth.service';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import { Router } from '@angular/router';

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
    private auth: AuthService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  register() {

      this.auth.register(this.id, this.passwd).subscribe(
        {
        next: (data) => {
          this.messageService.add({severity:'success', summary:'메세지', detail:'등록되었습니다.'});
        },
        error: (error) => {
          this.messageService.add({severity:'error', summary:'메세지', detail:'중복 되었습니다.'});
        }
      }
      );
  }

  cancel() {
      this.router.navigate(['/sbook', 'login']);
  }

}
