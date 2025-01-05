import { Component } from '@angular/core';

@Component({
  selector: 'app-content',
  template: `

  <button  mat-icon-button >

  </button>

  <router-outlet />
`,
standalone: false,
  styleUrl: './content.component.css'
})
export class ContentComponent {

}
