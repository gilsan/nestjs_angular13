import { AfterContentInit, Component, ContentChildren, OnInit, QueryList } from '@angular/core';
import { tap } from 'rxjs';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'ngshop-tab-container',
  templateUrl: './tab-container.component.html',
  styleUrls: ['./tab-container.component.scss'],
})
export class TabContainerComponent implements OnInit, AfterContentInit {
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent> = new QueryList();
  constructor() {}

  ngOnInit(): void {}

  ngAfterContentInit(): void {
    const activeTab = this.tabs.filter((tab) => tab.active === true);
    if (!activeTab || activeTab.length === 0) {
      this.selectedTab(this.tabs?.first);
    }
  }

  selectedTab(tab: TabComponent) {
    this.tabs.forEach((tab) => {
      tab.active = false;
    });
    tab.active = true;
    return false;
  }

  tapClass(tab: TabComponent) {
    return {
      'hover:text-indigo-400': !tab.active,
      'hover:text-white text-white bg-indigo-400': tab.active,
    };
  }
}
