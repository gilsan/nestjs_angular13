import { Component, OnDestroy, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate} from '@angular/animations';
import { barState, blinkState, numberEntereState, widthState } from './animations';
import { interval, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { SubSink } from 'subsink';
@Component({
  selector: 'app-animation',
  templateUrl: './angularAnimation.component.html',
  styleUrls: ['./angularAnimation.component.scss'],
  animations: [
    numberEntereState, blinkState,
    barState, widthState

  ]

})
export class AngularAnimationComponent implements OnInit, OnDestroy {

  stateBlink = 'show';
  width = {};
  counter = 0;
  progressBarFinish = false;
  private subs = new SubSink();

  constructor() { }

  ngOnDestroy(): void {
     this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.blink();
    this.progressBar()
  }

  blink() {
    this.subs.sink = interval(1000).subscribe(val => {
      this.stateBlink = this.stateBlink === 'show' ? 'hide' : 'show';
    });
  }

  progressBar() {
    this.subs.sink = interval(50).pipe(
      take(101)
    ).subscribe(val => {
      this.width = {'width': val + '%'};
      this.counter = val;

      if (val >= 100) {
        this.progressBarFinish = true;
      }
    })

  }









}
