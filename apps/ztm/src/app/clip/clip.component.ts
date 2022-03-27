import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngshop-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.scss'],
})
export class ClipComponent implements OnInit {
  id: string = '';
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.id = this.route.snapshot.params['id'];
  }
}
