import { ChangeDetectionStrategy, Input } from '@angular/core';
import { Component, EventEmitter, Output } from '@angular/core';
import { Menu } from '../../../core/models/layout/menu.model';
import { AuthService } from '../../../core/services/authservice/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})

export class HeaderComponent {

  @Input() menu: Menu = [];
  @Output() menuToggled = new EventEmitter<boolean>();

  constructor(private authService: AuthService)
  {

  }

  user: string = 'Enea';

  // constructor(private authService: AuthService) { }
  @Output() toggleMenu = new EventEmitter<void>();
  isMobile = false;

  ngOnInit() {
    this.isMobile = window.innerWidth <= 768;
  }
  logout(): void {
    console.log('Logged out');
    this.authService.logout();
    console.log('Logged out');
  }

}
