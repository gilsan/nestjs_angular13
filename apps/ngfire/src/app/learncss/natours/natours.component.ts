import { Component, NgZone, OnInit } from '@angular/core';

@Component({
  selector: 'app-natours',
  templateUrl: './natours.component.html',
  styleUrls: ['./natours.component.scss']
})
export class NatoursComponent implements OnInit {

  popup: boolean = false;
  constructor(
   private ngzone: NgZone
  ) {}

  ngOnInit(): void {
  }

  radioButtonClick(button: string) {
      console.log(button);
  }

  toggle() {
     this.popup = true;
  }

  styleStatus() {
    if (this.popup) {
      return { 'opacity': '1', 'visibility': 'visible'};
    }
    return { 'opacity': '0', 'visibility': 'hidden'};
  }
  goback(): void {
    this.popup = false;
  //  return '/learncss/natours';
  }

}
