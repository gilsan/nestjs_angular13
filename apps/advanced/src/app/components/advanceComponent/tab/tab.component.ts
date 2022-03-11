import { Component, OnInit, Input } from '@angular/core';
// import { TabsComponentComponent } from '../tabs/tabs.component';
import { Tab } from "./tab.interface";

@Component({
  selector: 'app-tab-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponentComponent implements OnInit, Tab {

  @Input() title: string;
  public isActive: boolean = false;

  constructor(
    // public tabs: TabsComponentComponent
  ) { }

  ngOnInit() {
    // this.tabs.addTab(this)
  }

}
