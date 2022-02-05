import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngshop-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})
export class FileuploadComponent implements OnInit {

  selectedFile: File = {} as File;
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  onFileSelected(event: any): void {
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    console.log('upload');
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.http.post('http://localhost:3000/file/upload', fd, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log('Upload Progress: ' + Math.round(event.loaded / event.total! * 100) + '%');
        } else if (event.type === HttpEventType.Response) {
          console.log(event);
        }

      })
  }

}
