import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'ngshop-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  constructor(private modalService: ModalService) {}

  ngOnInit(): void {}

  openModal($event: Event) {
    $event.preventDefault();
    this.modalService.toggle();
  }
}
