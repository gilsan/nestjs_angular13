import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate} from '@angular/animations';
import { numberEntereState } from './animations';

@Component({
  selector: 'app-animation',
  templateUrl: './angularAnimation.component.html',
  styleUrls: ['./angularAnimation.component.scss'],
  animations: [
    numberEntereState,

  ]

})
export class AngularAnimationComponent implements OnInit {

  clickInfo = 'default';
  numberEntered: number;

  constructor() { }

  ngOnInit(): void {

  }

  onClickSample() {
    this.clickInfo ='clicked';
    // setTimeout(() => {
    //   this.clickInfo ='default';
    // }, 1000);
  }

  getNumber(val: number) {
    this.numberEntered= val;
    console.log(this.numberEntered);
  }

}
