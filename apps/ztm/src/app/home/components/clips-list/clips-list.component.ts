import { Component, OnDestroy, OnInit } from '@angular/core';
import { IClip } from '../../../models/user.model';
import { ClipService } from '../../../services/clip.service';

@Component({
  selector: 'ngshop-clips-list',
  templateUrl: './clips-list.component.html',
  styleUrls: ['./clips-list.component.scss'],
})
export class ClipsListComponent implements OnInit, OnDestroy {
  clips: IClip[] = [];
  constructor(public clipService: ClipService) {}

  ngOnInit(): void {
    this.clipService.getClips();
    window.addEventListener('scroll', this.scrollHandler);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scrollHandler);
  }

  scrollHandler = () => {
    const { offsetHeight, scrollTop } = document.documentElement;
    const { innerHeight } = window;

    const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight;
    if (bottomOfWindow) {
      this.clipService.getClips();
    }
  };
}
