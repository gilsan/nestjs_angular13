import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IClip } from '../../models/user.model';
import { ClipService } from '../../services/clip.service';
import { ModalService } from '../../services/modal.service';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'ngshop-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export class ManageComponent implements OnInit {
  videoOrder = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: ModalService,
    private clipSerive: ClipService,
    private messageService: MessageService
  ) {}

  clips: IClip[] = [];
  currentClip: IClip | null = null;
  sort$: BehaviorSubject<string> = new BehaviorSubject<string>(this.videoOrder);

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.videoOrder = params['sort'];
    });
    // ztm 229 참조
    this.clipSerive.getUserClip(this.sort$).subscribe((data) => {
      data.forEach((list) => {
        this.clips.push({ docID: list.id, ...list.data() });
      });
    });
  }

  sort(event: Event) {
    const { value } = event.target as HTMLSelectElement;
    // this.router.navigateByUrl(`/manage?sort=${value}`);
    this.router.navigate(['/manage', 'a'], {
      relativeTo: this.route,
      queryParams: { sort: value },
    });
  }

  openModal(event: Event, clip: IClip) {
    event.preventDefault();
    this.modalService.toggle('VIDEOEDIT');
    this.currentClip = clip;
  }

  updated(data: IClip) {
    this.clips.forEach((clip, index) => {
      if (clip.docID === data.docID) {
        clip.title = data.title;
      }
    });
  }

  async delete(event: Event, data: IClip) {
    event.preventDefault();
    if (!data.docID) {
      return;
    }
    try {
      await this.clipSerive.deleteClip(data);
      this.messageService.add({ severity: 'success', summary: '삭제', detail: '삭제했습니다.' });

      this.clips.forEach((clip, index) => {
        if (clip.docID === data.docID) {
          this.clips.splice(index, 1);
        }
      });
    } catch (e) {
      this.messageService.add({ severity: 'error', summary: '실패', detail: '삭제실패' });
    }
  }
}
