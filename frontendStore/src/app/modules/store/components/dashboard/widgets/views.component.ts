import { Component } from '@angular/core';

@Component({
  selector: 'app-views',
  template: `
    <div class="row mb-8 mt-8">
      <p class="start">25,020</p>
      <mat-icon class="text-green">arrow_circle_up</mat-icon>

    </div>
    <div class="text-dim-gray start-subtext">
      <span class="text-green">+502</span> in the last 28 dyas

    </div> 
  `,
  standalone: false,

  styles:`


  ` 
})
export class ViewsComponent {

}
