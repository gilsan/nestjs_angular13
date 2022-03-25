import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngshop-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  isDragover = false;
  constructor() {}

  ngOnInit(): void {}

  storeFile(event: Event) {
    this.isDragover = false;
  }
}
