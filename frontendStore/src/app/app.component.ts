import { Component } from '@angular/core';
import { Router } from '@angular/router';
/**toggle() */
/**collapsed.set(!collapsed()) **/
@Component({
  selector: 'app-root',
  template:`

    <router-outlet></router-outlet>
  `,
  standalone: false,
  styles: [`

`]
})
export class AppComponent  {
 
  constructor(private router: Router) {}

  ngOnInit() {
    console.log('Current URL:', this.router.url);
    console.log('Router State:', this.router.routerState);
  }
}
