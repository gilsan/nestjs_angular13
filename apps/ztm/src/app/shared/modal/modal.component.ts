import { Component, OnDestroy, OnInit, ElementRef, Input } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'ngshop-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() modalID: string = '';
  constructor(public modalService: ModalService, private el: ElementRef) {}

  ngOnInit(): void {
    document.body.appendChild(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    document.body.removeChild(this.el.nativeElement);
  }

  closeModal($event: Event) {
    $event.preventDefault();
    this.modalService.toggle(this.modalID);
  }
}
