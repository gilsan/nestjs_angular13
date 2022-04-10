import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  display = false;
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  toggle() {
    this.display = true;
  }

  login() {
    this.display = false;
    this.router.navigate(['/login']);
  }

  course() {
    this.display = false;
    this.router.navigate(['/home']);
  }

  createUser() {
    this.display = false;
    this.router.navigate(['/create-user']);
  }

  logout() {
    this.display = false;
    this.authService.logout().subscribe((data) => {
      this.router.navigate(['/login']);
    });
  }

  csscourse() {
    this.display = false;
    this.router.navigate(['learncss']);
  }
}
