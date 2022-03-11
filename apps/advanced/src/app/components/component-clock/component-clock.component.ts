import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TimerService } from '../advanceComponent/timer/timer.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-component-clock',
  templateUrl: './component-clock.component.html',
  styleUrls: ['./component-clock.component.scss']
})
export class ComponentClockComponent implements OnInit, OnDestroy {

  // endSubject$: Observable<number>;

  private subs = new SubSink();

  constructor(
    private service: TimerService
  ) { }

  ngOnInit(): void {
    this.subs.sink = this.service.countdownEndSubject$.subscribe((data) => {
      // console.log('[]', data);
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
