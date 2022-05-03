import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nexter',
  templateUrl: './nexter.component.html',
  styleUrls: ['./nexter.component.scss']
})
export class NexterComponent implements OnInit {

  homes = [
    {
      svc: 'img/sprite.svg#icon-global',
      header: 'World\'s best luxury homes',
      text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur distinctio necessitatibus pariatur voluptatibus.'},
    {
      svc:'img/sprite.svg#icon-trophy',
      header: 'Only the best properties',
      text: 'Voluptatum mollitia quae. Vero ipsum sapiente molestias accusamus rerum sed a eligendi aut quia.'
    },
    {
      svc:'img/sprite.svg#icon-map-pin',
      header: 'All homes in in top locations',
      text: 'Tenetur distinctio necessitatibus pariatur voluptatibus quidem consequatur harum.'
    },
    {
      svc:'img/sprite.svg#icon-key',
      header: 'New home in one week',
      text: 'Vero ipsum sapiente molestias accusamus rerum. Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
    },
    {
      svc:'img/sprite.svg#icon-presentation',
      header: 'Top 1% realtors',
      text: 'Quidem consequatur harum, voluptatum mollitia quae. Tenetur distinctio necessitatibus pariatur voluptatibus.'
    },
    {
      svc:'img/sprite.svg#icon-lock',
      header: 'Secure payments on nexter',
      text: 'Pariatur voluptatibus quidem consequatur harum, voluptatum mollitia quae.'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
