import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { SocketioService } from '../../../socket-io.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  items: MenuItem[] = [
    {
      label: 'Google Meet'
    },
    {
      label: '둘러보기'
    },
    {
      label: '작동방식'
    },
    {
      label: '요금제및 가격'
    },


  ];


  @ViewChild('inputcode', { static: true }) inputcode: ElementRef;
  constructor(
    private router: Router,
    private socketService: SocketioService,

  ) { }

  ngOnInit(): void {
    this.socketService.reConnect();
  }

  logout() {

  }

  joinMeeting() {
    this.inputcode.nativeElement.focus();
  }

  joinAction(code: string) {
    this.router.navigate(['/home', 'screen'], { queryParams: { meetingID: code, type: 'join' } });
  }

  newMeeting() {
    const six_d_value = Math.floor(Math.random() * 100);
    this.router.navigate(['/home', 'screen'], { queryParams: { meetingID: six_d_value, type: 'admin' } });
  }

}
