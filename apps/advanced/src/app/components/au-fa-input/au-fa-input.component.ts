import { Component, ContentChild, Input, OnInit, AfterContentInit } from '@angular/core';


@Component({
  selector: 'app-au-fa-input',
  templateUrl: './au-fa-input.component.html',
  styleUrls: ['./au-fa-input.component.scss']
})
export class AuFaInputComponent implements OnInit, AfterContentInit {

  @Input() icon: string;


  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {

  }

  get classes() {
    const cssClasses = {
      'fa': true
    };

    if (this.icon) {
      cssClasses['fa-' + this.icon] = true;
    }
    return cssClasses;
  }

}
