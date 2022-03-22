import { Component, OnDestroy, OnInit } from '@angular/core';
import { from, fromEvent, of } from 'rxjs';

import { SubSink } from 'subsink';

@Component({
  selector: 'ngshop-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  constructor() {}

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  select() {
    from(fetch('https://jsonplaceholder.typicode.com/todos/1')).subscribe((data) => {
      console.log(data);
    });
  }
}
