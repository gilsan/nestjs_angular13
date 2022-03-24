import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'ngshop-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public auth: AuthService) {}
}
