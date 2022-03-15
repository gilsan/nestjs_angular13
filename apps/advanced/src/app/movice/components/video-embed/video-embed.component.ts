import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-embed',
  templateUrl: './video-embed.component.html',
  styleUrls: ['./video-embed.component.scss'],
})
export class VideoEmbedComponent implements OnInit {
  @Input() key: string = null;
  @Input() site: string = 'YouTube';

  videoUrl: SafeResourceUrl = '';

  constructor(private domSanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if (this.site === 'YouTube') {
      this.videoUrl = this.getSafeUrl('https://www.youtube.com/embed/' + this.key);
    }
  }

  getSafeUrl(url: string) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
