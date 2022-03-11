import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CountdownComponent } from '../component/countdown/countdown.component';

@Component({
  selector: 'app-component-handle',
  templateUrl: './component-handle.component.html',
  styleUrls: ['./component-handle.component.scss']
})
export class ComponentHandleComponent implements OnInit {

  counterProgress: number = 0;
  totalCountdown: number = 15;
  constructor() { }

  @ViewChild('countdown', { read: CountdownComponent }) countdown: CountdownComponent;

  ngOnInit(): void {
  }


  updateProgress(count: number) {
    this.counterProgress = (this.totalCountdown - count) / this.totalCountdown * 100;
  }

  countdownFinished() {

  }

}
