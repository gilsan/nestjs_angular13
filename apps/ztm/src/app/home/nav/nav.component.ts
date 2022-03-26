import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'ngshop-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  constructor(private modalService: ModalService, public auth: AuthService) {}

  ngOnInit(): void {}

  openModal($event: Event) {
    $event.preventDefault();
    this.modalService.toggle('AUTH');
  }

  async logout() {
    await this.auth.logout();
  }
}
