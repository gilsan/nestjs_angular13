import { Component, OnInit } from "@angular/core";
import { Observable, timer } from "rxjs";



@Component({
  selector: 'app-mainscreen',
  templateUrl: './mainscreen.component.html',
  styleUrls: ['./mainscreen.component.scss'],
})
export class MainComponent implements OnInit {

  counter = 100;
  loading = false;
  width = {};
  firstVisit = 0;
  aniLoading = false;

  ngOnInit(): void {

  }

  progressBar() {
    if (this.firstVisit === 0) {
      let c = 0;
      let barInterval = setInterval(() => {
        c = 100 - this.counter;
        this.width = {'width': c + '%'};
        this.counter--;

        if (this.counter <= 0 ) {
            this.loading = true;
            this.aniLoading = true;
            clearInterval(barInterval)

        }
      }, 50)

    } else {
      this.aniLoading = false;
    }
    this.firstVisit++;
    if (this.loading) {
      this.counter = 0;
       return {'width': '100%'};
    }
    return this.width;
    }



}




