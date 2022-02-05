import { NgModule } from "@angular/core";

import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';

import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';




@NgModule({
  imports: [
    AccordionModule,
    ButtonModule,
    CardModule,
    ConfirmDialogModule,
    DialogModule,
    DropdownModule,
    FieldsetModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    MenubarModule,
    PaginatorModule,
    TableModule,
    TabViewModule,
    TagModule,
    ToastModule,
    ToggleButtonModule,
    ToolbarModule,
  ],
  exports: [
    AccordionModule,
    ButtonModule,
    CardModule,
    ConfirmDialogModule,
    DialogModule,
    DropdownModule,
    FieldsetModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    MenubarModule,
    PaginatorModule,
    TableModule,
    TabViewModule,
    TagModule,
    ToastModule,
    ToggleButtonModule,
    ToolbarModule,
  ],
  providers: [
    ConfirmationService,
    MessageService,
  ]
})
export class PrimengModule {

}
