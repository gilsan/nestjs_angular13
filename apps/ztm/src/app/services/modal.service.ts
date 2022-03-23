import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  visible = true;

  isModalOpen() {
    return this.visible;
  }

  toggle() {
    this.visible = !this.visible;
  }
}
