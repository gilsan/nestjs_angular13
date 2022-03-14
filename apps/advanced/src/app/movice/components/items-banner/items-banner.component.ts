import { Component, Input } from '@angular/core';
import { Movie, TV } from '../../models/models';

@Component({
  selector: 'app-items-banner',
  templateUrl: './items-banner.component.html',
  styleUrls: ['./items-banner.component.scss'],
})
export class ItemsBannerComponent {
  @Input() items: Movie[] | null = [];
  @Input() title = '';
  @Input() tvItems: TV[] | null = [];
}
