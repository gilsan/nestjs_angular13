import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Movie, TV } from '../../models/models';
import { TVshowsService } from '../../services/tvshows.service';

@Component({
  selector: 'app-tvshows',
  templateUrl: './tvshows.component.html',
  styleUrls: ['./tvshows.component.scss'],
})
export class TvshowsComponent implements OnInit {
  tvs: TV[] = [];
  genreId: string | null = null;
  constructor(private route: ActivatedRoute, private tvService: TVshowsService) {}

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(({ genreid }) => {
      if (genreid) {
        this.genreId = genreid;
        this.getMovieByGenreId(genreid, 1);
      } else {
        this.getPageTV(1);
      }
    });
  }

  getPageTV(page: number) {
    this.tvService.searchTVs(page).subscribe((data) => {
      this.tvs = data;
      console.log(this.tvs);
    });
  }

  getMovieByGenreId(genreid: string, page: number) {
    this.tvService.getTVByGenreId(genreid, page).subscribe((data) => {
      this.tvs = data;
    });
  }

  paginate(event: any) {
    const page = event.page + 1;
    if (this.genreId) {
      this.getMovieByGenreId(this.genreId, page);
    } else {
      this.getPageTV(page);
    }
  }

  searchChange(title: string) {
    this.tvService.searcTV(title).subscribe((data) => {
      this.tvs = data;
    });
  }
}
