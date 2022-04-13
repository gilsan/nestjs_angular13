import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}
  state = true;
  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((data) => {
      // console.log(data);
    });
  }

  sidebarshow(state: boolean) {
    this.state = state;
  }

  toolBarClass() {
    if (this.state) {
      return { toolbar: true, bartool: false };
    }
    return { toolbar: false, bartool: true };
  }
}
