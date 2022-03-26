import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';

import { IClip } from '../../models/user.model';
import { ClipService } from '../../services/clip.service';
import { ModalService } from '../../services/modal.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'ngshop-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {
  @Input() clip: IClip | null = null;
  @Output() updated = new EventEmitter();

  formGroup: FormGroup = this.fb.group({
    docID: [''],
    title: [''],
  });

  constructor(
    private messageService: MessageService,
    private modalService: ModalService,
    private fb: FormBuilder,
    private clipService: ClipService
  ) {}

  ngOnChanges(): void {
    this.formGroup.get('docID')?.setValue(this.clip?.docID);
    this.formGroup.get('title')?.setValue(this.clip?.title);
  }

  ngOnInit(): void {
    this.modalService.register('VIDEOEDIT');
  }

  ngOnDestroy(): void {
    this.modalService.unregister('VIDEOEDIT');
  }

  async update() {
    if (!this.clip) {
      return;
    }
    try {
      await this.clipService.updateClip(this.formGroup.get('docID')?.value, this.formGroup.get('title')?.value);
      this.modalService.toggle('VIDEOEDIT');
      this.messageService.add({ severity: 'info', summary: '수정', detail: '수정했습니다.' });
      this.clip.title = this.formGroup.get('title')?.value;

      this.updated.emit(this.clip);
    } catch (e) {
      this.messageService.add({ severity: 'error', summary: '실패', detail: '수정못했습니다.' });
    }
  }
}
