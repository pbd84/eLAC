import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  template: `
  <mat-sidenav-container class="sidenav-container">
    <mat-sidenav-content>
      <!-- ########## Header ############ -->
        <mat-toolbar color="primary">
          <a href style="margin-right: 20px; margin-top: 20px;"><img src="../../assets/images/logo.png" width="75" [routerLink]="['/']"></a>
              <span class="navbar-center">
                <app-elac-search></app-elac-search>
              </span>
              <button style="margin-top: 20px;" mat-button class="navbar-btn" [routerLink]="['/']">
              <a href ><img src="../../assets/images/globe.png" width="35px"></a>
              </button>
        </mat-toolbar>
      <!-- ########## /Header ############ -->

      <!-- ########## Content ############ -->
        <div class="main-container">
          <router-outlet></router-outlet>
        </div>
      <!-- ########## /Content ############ -->

      <!-- ########## Footer ############ -->
        <mat-toolbar color="primary" >
          <section class="mat-small navbar-center" style="white-space: normal;">
              <i class="material-icons"> copyright </i>
              {{ date | date:'y' }} Copyright - Language Archive Cologne (LAC) -
              <a class="navbar-links"
              mat-button
              href="https://www.uni-koeln.de/"
              target="_blank"
              matTooltip="University of Cologne">University of Cologne</a>
              <a href="https://github.com/pbd84/eLAC_Angular"><img src="../../assets/images/github.png" style="width: 40px; position: absolute;"></a>
          </section>
        </mat-toolbar>
      <!-- ########## /Footer ############ -->
    </mat-sidenav-content>
  </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container {
        height: 100%;
    }

    .sidenav {
        width: 200px;
    }

    .sidenav .mat-toolbar {
        background: inherit;
    }

    .mat-toolbar.mat-primary {
        position: sticky;
        top: 0;
        z-index: 1;
        height: 5em;
    }

    .navbar-center {
        flex: 1 1 auto;
        text-align: center;
    }

    .navbar-btn {
        color: #ffffff;
        cursor: pointer;
    }

    .main-container {
      min-height: calc(85vh - 3em);
      max-width: 1600px;
      margin: 0 auto;
    }
  `]
})
export class AppComponent {

  title = 'eLAC';
  date: number = Date.now();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(private breakpointObserver: BreakpointObserver) { }
}
