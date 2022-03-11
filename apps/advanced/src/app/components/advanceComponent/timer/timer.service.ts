import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";


@Injectable()
export class TimerService {

  private countdownTimerRef: any = null;
  public countdown: number = 0;
  public init = 0;
  public paused = true;
  endSubject$ = new BehaviorSubject<number>(0);
  countdownEndSubject$ = this.endSubject$.asObservable();

  countdownEnd$ = new Subject<void>();
  endCountdown$ = this.countdownEnd$.asObservable();

  destroy(): void {
    this.clearTimeout();
  }

  restartCountdown(init?) {
    if (init) {
      this.init = init;
    }
    if (init && init > 0) {
      this.paused = true;
      this.clearTimeout();
      this.endSubject$.next(this.init);
    }
  }

  toogleCountdown() {
    this.paused = !this.paused;
    if (this.paused === false) {
      this.doCountdown();
    } else {
      this.clearTimeout();
    }
  }

  private doCountdown() {
    this.countdownTimerRef = setTimeout(() => {
      // this.countdown = this.countdown - 1;
      this.endSubject$.next(this.endSubject$.getValue() - 1);
      this.processCountdown();
    }, 1000);
  }

  private processCountdown() {
    if (this.endSubject$.getValue() == 0) {
      this.countdownEnd$.next();
      this.endSubject$.next(0);
      this.paused = true;
      console.log("--countdown end--");
    }
    else {
      this.doCountdown();
    }
  }

  private clearTimeout() {
    if (this.countdownTimerRef) {
      clearTimeout(this.countdownTimerRef);
      this.countdownTimerRef = null;
    }
  }


}
