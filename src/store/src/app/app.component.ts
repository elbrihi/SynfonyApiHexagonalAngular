import { Component, computed,  effect,  OnDestroy, OnInit, signal } from '@angular/core';
/**toggle() */
/**collapsed.set(!collapsed()) **/
@Component({
  selector: 'app-root',
  template:`
       <mat-toolbar class="mat-elevation-z3 toolbar">
      <button 
        mat-icon-button
        (click)="collapsed.set(!collapsed())"
      >
        <mat-icon>menu</mat-icon>
      </button>

      <button mat-icon-button (click)="darkMode.set(!darkMode())">
        @if(darkMode()) {
          <mat-icon>light_mode</mat-icon>
        } @else {
          <mat-icon>dark_mode</mat-icon>
        }
      </button>
    </mat-toolbar>


    <mat-sidenav-container>                          
        <mat-sidenav
          [mode]="sidenavMode()"
          [opened]="isSidenavOpen()"
          [style.width]="sidenavWidth()"
        >
            <app-custom-sidenav 
                [collapsed]="collapsed()"
            >
            </app-custom-sidenav>
        </mat-sidenav>
        <mat-sidenav-content class="content" 
        [style.margin-left]="sidenavMargin()">
          <router-outlet></router-outlet>
        </mat-sidenav-content>
    </mat-sidenav-container>
  `,
   standalone: false,
  styles: [`
  
    mat-toolbar {
      position: relative;
      z-index: 5;
      align-items: center;
      justify-content: space-between;
      --mat-toolbar-container-background-color: var(--sys-surface-container-low)
    }
    mat-sidenav-container {
      height: calc(100vh - 64px);
    }
    mat-sidenav-container{
    }
    mat-sidenav{
    }
    mat-sidenav-content{
    }
    mat-sidenav,
    mat-sidenav-content{
      transition: all 500ms ease-in-out;

    }
    app-custom-sidenav{
    }
    .content {
      
      padding: 24px;
      
    }

    @media (max-width: 768px) {
      mat-sidenav-container {
        
        height: 100vh;
      }
      mat-sidenav {
        position: absolute;
        z-index: 6;
      }
      .content {
        margin-left: 0;
      }
    }

    @media (min-width: 769px) and (max-width: 1024px) {
      mat-sidenav {
        width: 200px;
      }
    }
`]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'my-app';
  collapsed = signal(false);

  sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px' );

  darkMode = signal(false);

  setDarkMode = effect(() =>{
      document.documentElement.classList.toggle('dark',this.darkMode());
  });


  sidenavMode = () => window.innerWidth <= 768 ? 'over' : 'side';

  isSidenavOpen = () => (window.innerWidth > 768 || !this.collapsed());

  sidenavMargin = () => (window.innerWidth > 768 ? this.sidenavWidth() : '0');

  ngOnInit() {
    console.log(this.collapsed)
    window.addEventListener('resize', this.onResize);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize = () => {
    this.collapsed.set(window.innerWidth <= 768);
  };

  toggle() {
    console.log("hello",!this.collapsed())
    this.collapsed.set(!this.collapsed());
  }
}
