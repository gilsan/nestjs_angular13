import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'webrtc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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
  constructor() { }

  ngOnInit(): void {
  }

  logout() {

  }

  joinMeeting() {
    this.inputcode.nativeElement.focus();
  }

  joinAction(code: string) {
    console.log(code);
  }

  newMeeting() {
    const six_d_value = Math.floor(Math.random() * 1000000);
    console.log(six_d_value);
  }

}
