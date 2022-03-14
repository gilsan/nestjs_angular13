import { Component, Input, OnInit } from '@angular/core';
import { IMAGE_SIZES } from '../../constant/constant';
import { Movie, TV } from '../../models/models';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss'],
})
export class MovieItemComponent implements OnInit {
  @Input() itemData: Movie = null;
  @Input() tvData: TV = null;
  constructor() {}

  readonly imageSize = IMAGE_SIZES;
  ngOnInit(): void {}
}
