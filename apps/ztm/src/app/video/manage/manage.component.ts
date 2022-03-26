import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IClip } from '../../models/user.model';
import { ClipService } from '../../services/clip.service';
import { ModalService } from '../../services/modal.service';

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
    private clipSerive: ClipService
  ) {}

  clips: IClip[] = [];
  currentClip: IClip | null = null;
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.videoOrder = params['sort'];
    });

    this.clipSerive.getUserClip().subscribe((data) => {
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
}
