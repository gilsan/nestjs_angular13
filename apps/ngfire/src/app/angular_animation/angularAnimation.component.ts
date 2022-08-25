import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animation',
  templateUrl: './angularAnimation.component.html',
  styleUrls: ['./angularAnimation.component.scss']
})
export class AngularAnimationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.init();
  }

  init() {}

}
