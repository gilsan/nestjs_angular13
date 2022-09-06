import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, transition, animate} from '@angular/animations';
import { barState, blinkState, boxState, movingRight, numberEntereState, widthState,  } from './animations';
import { interval, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { SubSink } from 'subsink';

import SwiperCore, { SwiperOptions, Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { EventsParams } from 'swiper/angular';
import { timeStamp } from 'console';
import * as THREE from 'three';
import { request } from 'http';
import { EngineService } from './engine.service';


// install Swiper modules
SwiperCore.use([Navigation  ]);



@Component({
  selector: 'app-animation',
  templateUrl: './angularAnimation.component.html',
  styleUrls: ['./angularAnimation.component.scss'],
  animations: [
    numberEntereState, blinkState,
    barState, widthState,boxState,movingRight

  ],


})
export class AngularAnimationComponent implements OnInit, OnDestroy, AfterViewInit {

  stateBlink = 'show';
  loadingBorder = 'start';
  movingBar = "start";
  loadingBox = true;
  makecircle = 'circle';
  makecircleState = false;

  movingright = 'start';


  imagestate =false;
  loadingbackground = false;

  width = {};
  counter = 0;
  progressBarFinish = false;
  private subs = new SubSink();

  status1 = false;
  status2 = false;
  status3 = false;




  @ViewChild('rendererCanvas', { static: true })
  public rendererCanvas: ElementRef<HTMLCanvasElement>;

  constructor(
    private engServ: EngineService
  ) { }


  ngOnDestroy(): void {
     this.subs.unsubscribe();
  }


  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.blink();
    this.progressBar();
    this.loadingborder();
    this.movingRight();

    this.engServ.createScene(this.rendererCanvas);
    this.engServ.animate();
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

  movingRight() {
    this.subs.sink =  interval(1000).pipe().subscribe(val => {

         if (val % 16 === 0 || val === 0) {

            if (this.movingright === 'start') {
              this.movingright = 'end';
            } else if (this.movingright === 'end') {
              this.movingright = 'start';
            }

         }
      })
  }


  onSwiper(params: EventsParams ) {
    // const [swiper] = params;
    // console.log(swiper);
   // console.log(params);
  }
  onSlideChange() {
   // console.log('slide change');
  }

  status(val: number ){
    this.status1 = false;
    this.status2 = false;
    this.status3 = false;
      if (val === 1) {
        this.status1 = true;
      } else if (val === 2) {
        this.status2 =true;
      } else if (val === 3) {
        this.status3 = true;
      }
  }



}
