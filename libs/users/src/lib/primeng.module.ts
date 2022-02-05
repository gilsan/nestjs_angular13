import { NgModule } from "@angular/core";

import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';

import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
  imports: [
    AccordionModule,
    ButtonModule,
    CardModule,
    ConfirmDialogModule,
    DropdownModule,
    FieldsetModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    PaginatorModule,
    TableModule,
    TagModule,
    ToastModule,
    ToolbarModule,
  ],
  exports: [
    AccordionModule,
    ButtonModule,
    CardModule,
    ConfirmDialogModule,
    DropdownModule,
    FieldsetModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    PaginatorModule,
    TableModule,
    TagModule,
    ToastModule,
    ToolbarModule,
  ],
  providers: [
    ConfirmationService,
    MessageService,
  ]
})
export class PrimengModule {

}
