import { NgModule } from '@angular/core';

import { AccordionModule } from 'primeng/accordion';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { PaginatorModule } from 'primeng/paginator';
import { RatingModule } from 'primeng/rating';
import { SelectButtonModule } from 'primeng/selectbutton';
import {SlideMenuModule} from 'primeng/slidemenu';
import { SidebarModule } from 'primeng/sidebar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TreeSelectModule } from 'primeng/treeselect';

@NgModule({
  imports: [
    AccordionModule,
    BadgeModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    CheckboxModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    DialogModule,
    DropdownModule,
    FieldsetModule,
    InputMaskModule,
    InputNumberModule,
    InputSwitchModule,
    InputTextModule,
    MenubarModule,
    PaginatorModule,
    RatingModule,
    SelectButtonModule,
    SidebarModule,
    SlideMenuModule,
    SplitButtonModule,
    TabMenuModule,
    TableModule,
    TabViewModule,
    TagModule,
    TieredMenuModule,
    ToastModule,
    ToolbarModule,
    TreeSelectModule,
  ],
  exports: [
    AccordionModule,
    BadgeModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    CheckboxModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    DialogModule,
    DropdownModule,
    FieldsetModule,
    InputMaskModule,
    InputNumberModule,
    InputSwitchModule,
    InputTextModule,
    MenubarModule,
    PaginatorModule,
    RatingModule,
    SelectButtonModule,
    SidebarModule,
    SlideMenuModule,
    SplitButtonModule,
    TabMenuModule,
    TabViewModule,
    TableModule,
    TagModule,
    TieredMenuModule,
    ToastModule,
    ToolbarModule,
    TreeSelectModule,
  ],
  providers: [ConfirmationService, MessageService],
})
export class PrimengModule {}
