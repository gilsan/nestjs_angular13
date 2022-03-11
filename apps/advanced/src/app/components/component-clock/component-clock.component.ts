import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-component-clock',
  templateUrl: './component-clock.component.html',
  styleUrls: ['./component-clock.component.scss']
})
export class ComponentClockComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  isAddTimerVisible = false;
  isCountdownEnd = true;
  time: number;
  timers: Array<number> = [];
  @ViewChild('inputTimer') inputTimer: ElementRef;

  constructor(
    private render: Renderer2
  ) { }

  ngOnInit(): void {
    this.timers = [3, 6];
  }



  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  showAddTimer() {
    this.isAddTimerVisible = true;
    this.render.setAttribute(this.inputTimer.nativeElement, "placeholder", "enter number");
  }

  hideAddTimer() {
    this.isAddTimerVisible = false;

  }

  submitAddTimer() {
    this.timers.push(this.time);
    this.hideAddTimer();

  }

  timerFinish() {
    this.isCountdownEnd = false;
    console.log('timer finish...');
  }

  submitEndTimer() {
    this.isCountdownEnd = true;
    this.ngOnInit();
  }

}
