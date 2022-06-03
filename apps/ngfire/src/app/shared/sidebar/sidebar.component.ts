import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  display = false;
  items: MenuItem[];
  animationsItems: MenuItem[];
  sampleAngularLists: MenuItem[];

  constructor(private router: Router, private authService: AuthService) {}
  @Output() sidebarshow = new EventEmitter<boolean>();
  ngOnInit(): void {
    this.menuList();
    this.animationsItemsList();
    this.ngSample();
  }

  menuList() {
    this.items = [
      {
        label: '친절여행',
        icon: 'pi pi-refresh',
        routerLink: '/learncss/natours',
      },
      {
        label: '라스팔마호텔',
        icon: 'pi pi-times',
        routerLink: '/learncss/trillo',
      },
      {
        label: '주택안내',
        icon: 'pi pi-external-link',
        routerLink: '/learncss/nexter',
      },
      {
        label: 'Grid',
        icon: 'pi pi-upload',
        routerLink: '/learncss/grid',
      },
    ];
  }

  animationsItemsList() {
    this.animationsItems = [
      {
        label: '2D Animation',
        icon: 'pi pi-refresh',
        routerLink: '/animation/2d',
      },
      {
        label: '3D Animation',
        icon: 'pi pi-refresh',
        routerLink: '/animation/3d',
      },
      {
        label: '상자처리',
        icon: 'pi pi-refresh',
        routerLink: '/animation/menuHover',
      },
      {
        label: '그림처리',
        icon: 'pi pi-refresh',
        routerLink: '/animation/images',
      },
      {
        label: '메뉴처리',
        icon: 'pi pi-refresh',
        routerLink: '/animation/menus',
      },
      {
        label: '카드처리',
        icon: 'pi pi-refresh',
        routerLink: '/animation/cards',
      },
      {
        label: '연기효과',
        icon: 'pi pi-refresh',
        routerLink: '/animation/smoky',
      },
      {
        label: '애니메이션',
        icon: 'pi pi-refresh',
        items: [
          { label: 'Part I', icon: 'pi pi-refresh',routerLink: '/animation/animate'},
          { label: 'Part II', icon: 'pi pi-refresh',routerLink: '/animation/animate2'},
          { label: 'Part III', icon: 'pi pi-refresh',routerLink: '/animation/animate3'}
        ]

      },
      {
        label: 'TypeScript',
        icon: 'pi pi-refresh',
        routerLink: '/typescript',
      },
    ]
  }

  ngSample() {
    this.sampleAngularLists  = [
      {
        label: 'Simple Book',
        icon: 'pi pi-refresh',
        routerLink: '/sbook',
      },
    ]
  }


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

  unitcourse() {
    this.display = false;
    this.router.navigate(['/unitcourse']);
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

  onShow() {
    this.sidebarshow.emit(false);
  }

  onHide() {
    this.sidebarshow.emit(true);
  }
}
