import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  constructor(

  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    localStorage.removeItem('token');

  }

}
