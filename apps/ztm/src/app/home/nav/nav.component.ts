import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'ngshop-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  constructor(private modalService: ModalService, public auth: AuthService, private afauth: AngularFireAuth) {}

  ngOnInit(): void {}

  openModal($event: Event) {
    $event.preventDefault();
    this.modalService.toggle();
  }

  async logout() {
    await this.afauth.signOut();
  }
}
