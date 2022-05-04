import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nexter',
  templateUrl: './nexter.component.html',
  styleUrls: ['./nexter.component.scss']
})
export class NexterComponent implements OnInit {

  homes = [
    {
      img: '/assets/nexter/house-1.jpeg',
      like: '/assets/nexter/sprite.svg#icon-heart-full',
      name: 'Beautiful Familiy House',
      location: {svg: '/assets/nexter/sprite.svg#icon-map-pin', text: ''},
      rooms: '/assets/nexter/sprite.svg#icon-profile-male',
      area: '/assets/nexter/sprite.svg#icon-expand',
      price: '/assets/nexter/sprite.svg#icon-key'
    },
    {
      img: '/assets/nexter/',
      like: '/assets/nexter/',
      name: '',
      location: '/assets/nexter/',
      rooms: '/assets/nexter/',
      area: '/assets/nexter/',
      price: '/assets/nexter/'
    },
    {
      img: '/assets/nexter/',
      like: '/assets/nexter/',
      name: '',
      location: '/assets/nexter/',
      rooms: '/assets/nexter/',
      area: '/assets/nexter/',
      price: '/assets/nexter/'
    },
    {
      img: '/assets/nexter/',
      like: '/assets/nexter/',
      name: '',
      location: '/assets/nexter/',
      rooms: '/assets/nexter/',
      area: '/assets/nexter/',
      price: '/assets/nexter/'
    },
    {
      img: '/assets/nexter/',
      like: '/assets/nexter/',
      name: '',
      location: '/assets/nexter/',
      rooms: '/assets/nexter/',
      area: '/assets/nexter/',
      price: '/assets/nexter/'
    },
    {
      img: '/assets/nexter/',
      like: '/assets/nexter/',
      name: '',
      location: '/assets/nexter/',
      rooms: '/assets/nexter/',
      area: '/assets/nexter/',
      price: '/assets/nexter/'
    },





  ];

  constructor() { }

  ngOnInit(): void {
  }

}
