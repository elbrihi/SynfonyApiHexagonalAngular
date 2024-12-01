import { Injectable } from '@angular/core';
import { Menu } from '../models/menu-item.model';

export interface MenuItem {
  title?: string;
  icon?: string;
  link?: string;
  color?: string;

  hideFor?: string;

  expanded?: boolean;
  subMenu?: MenuItem[];
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menu: Menu = [
    {
      title: 'Dashboard',
      icon: 'dashboard',
      link: '/dashboard',
      color: 'primary'
    },
    {
      title: 'Users',
      icon: 'people',
      link: '/dashboard/users',
      color: 'accent'
    },
    {
      title: 'Catalog',
      icon: 'inventory',
      link: '/dashboard/catalog',
      color: 'warn',
      subMenu: [
        {
          title: 'Products',
          icon: 'list',
          link: '/dashboard/catalog/products'
        },
        {
          title: 'Categories',
          icon: 'category',
          link: '/dashboard/catalog/categories'
        }
      ]
    },
    {
      title: 'Settings',
      icon: 'settings',
      link: '/dashboard/settings',
      color: 'primary'
    }
  ];

 
}
