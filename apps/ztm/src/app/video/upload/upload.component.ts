import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngshop-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  isDragover = false;
  file: File | null = null;
  nextStep = false;

  constructor() {}

  ngOnInit(): void {}

  storeFile(event: Event) {
    this.isDragover = false;
    this.file = (event as DragEvent).dataTransfer?.files.item(0) ?? null;
    console.log(this.file?.type);
    if (this.file) {
      if (this.file?.type !== 'video/webm' || !this.file) {
        return;
      }
    }

    this.nextStep = true;
  }

  onSelectedFile(event: Event) {}
}
