import { NgModule } from '@angular/core';

import { AccordionModule } from 'primeng/accordion';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { ImageModule } from 'primeng/image';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';

import { PaginatorModule } from 'primeng/paginator';
import { RatingModule } from 'primeng/rating';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
  imports: [
    AccordionModule,
    BadgeModule,
    ButtonModule,
    CarouselModule,
    CardModule,
    CheckboxModule,
    ConfirmDialogModule,
    DropdownModule,
    FieldsetModule,
    ImageModule,
    InputMaskModule,
    InputNumberModule,
    InputSwitchModule,
    InputTextModule,
    PaginatorModule,
    RatingModule,
    TabViewModule,
    TableModule,
    TagModule,
    ToastModule,
    ToolbarModule,
  ],
  exports: [
    AccordionModule,
    BadgeModule,
    ButtonModule,
    CarouselModule,
    CardModule,
    CheckboxModule,
    ConfirmDialogModule,
    DropdownModule,
    FieldsetModule,
    ImageModule,
    InputMaskModule,
    InputNumberModule,
    InputSwitchModule,
    InputTextModule,
    PaginatorModule,
    RatingModule,
    TabViewModule,
    TableModule,
    TagModule,
    ToastModule,
    ToolbarModule,
  ],
  providers: [ConfirmationService, MessageService],
})
export class PrimengModule {}
