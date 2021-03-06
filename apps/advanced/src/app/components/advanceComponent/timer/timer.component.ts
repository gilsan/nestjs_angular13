import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { TimerService } from './timer.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  providers: [TimerService]
})
export class TimerComponent implements OnInit, OnDestroy {

  @Output() onComplete = new EventEmitter<void>();
  @Input() init: number = 20;
  countdown = 0;


  constructor(
    public service: TimerService
  ) { }

  ngOnInit(): void {
    if (this.init) {
      this.countdown = this.init;
    }

    if (this.init && this.init > 0) {
      this.service.restartCountdown(this.init);
      this.service.countdownEndSubject$.subscribe(data => {
        this.countdown = data;
      });

    }

    this.service.endCountdown$.subscribe(() => {
      this.onComplete.emit();

    })
  }

  ngOnDestroy(): void {
    this.service.destroy();
  }

  get progress() {
    return (this.init - this.countdown) / this.init * 100
  }






}
