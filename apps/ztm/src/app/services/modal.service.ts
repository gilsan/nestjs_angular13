import { Injectable } from '@angular/core';
import { IModal } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  visible = false;
  modals: IModal[] = [];

  register(id: string) {
    this.modals.push({
      id,
      visible: false,
    });
  }

  unregister(id: string) {
    this.modals = this.modals.filter((modal) => modal.id !== id);
  }

  isModalOpen(id: string): boolean {
    const modal = this.modals.find((modal) => modal.id === id);
    if (!modal) {
      return true;
    }
    return modal.visible;
  }

  toggle(id: string) {
    const modal = this.modals.find((modal) => modal.id === id);
    if (modal) {
      modal.visible = !modal.visible;
    }
  }
}
