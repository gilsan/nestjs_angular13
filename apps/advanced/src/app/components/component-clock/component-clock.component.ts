import { Component, OnDestroy, OnInit } from '@angular/core';
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
  time = 0;
  constructor(

  ) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  showAddTimer() {
    this.isAddTimerVisible = true;
  }

  hideAddTimer() {
    this.isAddTimerVisible = false;
  }

}
