import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'ngshop-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  constructor(public modalService: ModalService) {}

  ngOnInit(): void {}

  closeModal($event: Event) {
    $event.preventDefault();
    this.modalService.toggle();
  }
}
