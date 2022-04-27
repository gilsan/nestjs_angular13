import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trillo',
  templateUrl: './trillo.component.html',
  styleUrls: ['./trillo.component.scss']
})
export class TrilloComponent implements OnInit {

  active = true;
  currentMenu = 0;
  menu: {img: string, menuname: string}[] = [
    {img:"/assets/img/sprite.svg#icon-home", menuname: '호텔' },
    {img:"/assets/img/sprite.svg#icon-aircraft-take-off", menuname: '항공권' },
    {img:"/assets/img/sprite.svg#icon-key", menuname: '렌트카' },
    {img:"/assets/img/sprite.svg#icon-map", menuname: '식당' },
  ]
  constructor() { }

  ngOnInit(): void {

  }

  whichactive(i: number) {
   console.log(i);
   this.currentMenu = i;
  }

  toggle(i: number) {
    if (this.currentMenu === i) {
      return true;
    }
    return false;
  }

}
