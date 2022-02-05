import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'ui-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnChanges {

  @Input() images: string[] = [];
  selectedImage: SafeResourceUrl = '';
  // images: string[] = [];

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {

    if (this.images.length) {
      this.selectedImage = this.sanitizer.bypassSecurityTrustResourceUrl(this.images[0]);
    } else {
      setTimeout(() => {
        this.selectedImage = this.sanitizer.bypassSecurityTrustResourceUrl(this.images[0]);
      }, 500);
    }
  }

  ngOnChanges() {

  }

  getUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  get isImage() {
    return this.images.length > 0;
  }

  changeImage(url: string) {
    this.selectedImage = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
