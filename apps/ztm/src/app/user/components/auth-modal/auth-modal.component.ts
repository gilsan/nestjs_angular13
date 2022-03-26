import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'ngshop-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss'],
})
export class AuthModalComponent implements OnInit, OnDestroy {
  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.modalService.register('AUTH');
    // this.modalService.toggle('AUTH');
  }

  ngOnDestroy(): void {
    this.modalService.unregister('AUTH');
  }
}
