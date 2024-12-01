import { Component, HostListener, ViewChild } from '@angular/core';
import { Menu } from '../../../core/models/layout/menu.model';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
  opened = true;

  toggle(): void {
    this.opened = !this.opened;
  }
  
  @ViewChild(MatDrawer) drawer!: MatDrawer;

  isMobile = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent) { // Specify the event type
    this.isMobile = window.innerWidth <= 768;
  }

  ngOnInit() {
    this.isMobile = window.innerWidth <= 768;
  }
  // Parent Components 

  parentMessage = 'Message from Parent Component';
  menu: Menu = [
    {
      title: 'Home',
      icon: 'home',
      link: '/home',
      color: '#ff7f0e',
      subMenu:[]
    
    },
    {
      title: 'Statistics',
      icon: 'bar_chart',
      color: '#ff7f0e',
      subMenu: [
        {
          title: 'Sales',
          icon: 'money',
          link: '/sales',
          color: '#ff7f0e',
        },
        {
          title: 'Customers',
          icon: 'people',
          color: '#ff7f0e',
          link: '/customers',
        },
      ],
    },
  ];
}
