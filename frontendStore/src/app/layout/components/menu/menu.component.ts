import { ChangeDetectionStrategy, Input } from '@angular/core';
import { Component } from '@angular/core';
import { Menu } from '../../../core/models/layout/menu.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class MenuComponent {


  @Input() childMessage?: string = '';
  //@Input() menu: Menu = [];
  constructor(){
    console.log(this.childMessage);
  }
  menu: Menu = [
    {
      title: 'Home',
      icon: 'home',
      link: '/home',
      color: '#c2c7d0',
    
    },
    {
      title: 'Statistics',
      icon: 'bar_chart',
      color: '#c2c7d0',
      subMenu: [
        {
          title: 'Sales',
          icon: 'money',
          link: '/sales',
          color: '#c2c7d0',
        },
        {
          title: 'Customers',
          icon: 'people',
          color: '#c2c7d0',
          link: '/customers',
        },
      ],
    },
  ];
}
