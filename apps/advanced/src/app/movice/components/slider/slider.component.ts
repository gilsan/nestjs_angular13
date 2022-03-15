import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { IMAGE_SIZES } from '../../constant/constant';
import { Movie } from '../../models/models';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: [trigger('slideFade', [state('void', style({ opacity: 0 })), transition('void <=> *', [animate('1s')])])],
})
export class SliderComponent implements OnInit {
  @Input() items: Movie[] = [];
  @Input() isBanner: boolean = false;
  readonly imageSize = IMAGE_SIZES;
  currentIndex = 0;
  constructor() {}

  ngOnInit(): void {
    if (!this.isBanner) {
      setInterval(() => {
        this.currentIndex++;
        if (this.currentIndex > this.items.length) {
          this.currentIndex = 0;
        }
      }, 5000);
    }
  }
}
