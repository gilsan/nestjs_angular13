import { Component, ContentChildren, OnInit, QueryList, AfterContentInit } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, AfterContentInit {

  @ContentChildren(TabComponent)
  tabs: QueryList<TabComponent>;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    const selectedTab = this.tabs.find(tab => tab.selected);
    if (!selectedTab && this.tabs.first) {
      this.tabs.first.selected = true;
    }


  }

  selectTab(tab: TabComponent) {
    this.tabs.forEach(tab => tab.selected = false);
    tab.selected = true;
  }

  get tabsContext() {
    return { tabs: this.tabs };
  }
}
