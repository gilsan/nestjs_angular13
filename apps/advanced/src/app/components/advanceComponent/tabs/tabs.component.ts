import { AfterContentInit, Component, ContentChildren, OnInit, QueryList } from '@angular/core';
import { TabComponentComponent } from '../tab/tab.component';
import { Tab } from "../tab/tab.interface";


@Component({
  selector: 'app-tabstabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponentComponent implements OnInit, AfterContentInit {

  @ContentChildren(TabComponentComponent) tabLists: QueryList<TabComponentComponent>;
  public tabs: Tab[] = [];

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    const selectedTab = this.tabLists.find(tab => tab.isActive);
    if (!selectedTab && this.tabLists.first) {
      this.tabLists.first.isActive = true;
    }
  }


  selectTab(tab: Tab) {
    this.tabLists.forEach(list => list.isActive = false);
    tab.isActive = true;
  }


}
