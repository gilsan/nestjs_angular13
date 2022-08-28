import { Component, OnDestroy, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate} from '@angular/animations';
import { barState, blinkState, boxState, numberEntereState, widthState,  } from './animations';
import { interval, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { timeStamp } from 'console';
@Component({
  selector: 'app-animation',
  templateUrl: './angularAnimation.component.html',
  styleUrls: ['./angularAnimation.component.scss'],
  animations: [
    numberEntereState, blinkState,
    barState, widthState,boxState,

  ]

})
export class AngularAnimationComponent implements OnInit, OnDestroy {

  stateBlink = 'show';
  loadingBorder = 'start';
  movingBar = "start";
  loadingBox = true;
  makecircle = 'circle';
  makecircleState = false;

  imagestate =false;
  loadingbackground = false;

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
    this.progressBar();
    this.loadingborder();

  }

  blink() {
    this.subs.sink = interval(1000).subscribe(val => {
      this.stateBlink = this.stateBlink === 'show' ? 'hide' : 'show';
    });
  }

  loadingborder() {

    this.subs.sink = interval(1000).pipe(
        take(2)
    ).subscribe(val => {
      this.loadingBorder ='finish';
    })

  }

  progressBar() {
    this.subs.sink = interval(50).pipe(
      take(101)
    ).subscribe(val => {
      this.width = {'width': val + '%'};
      this.counter = val;

      if (val >= 100) {
        this.progressBarFinish = true;
        this.movingbar();
      }
    })

  }

  movingbar() {
    this.subs.sink = interval(300).pipe(take(21)).subscribe(val => {
      if (val === 0) {
        this.movingBar = 'finish';
      } else if (val === 2) {
        this.loadingBox = false;
      } else if (val === 3) {
        this.makeCircle();
      } else if (val === 18) {
        this.hideCircle();
      } else if (val === 19) {
        this.imageState();
      } else if (val === 20) {
        this.loadingBackground();
      }
    })

  }

  makeCircle() {
    this.makecircle = 'circle';
  }

  hideCircle() {
   this.makecircle = 'hide'
  }

  imageState() {
    this.imagestate = true;
  }

  loadingBackground() {
    this.loadingbackground = true;
  }





}
