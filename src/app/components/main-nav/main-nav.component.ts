import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
})
export class MainNavComponent implements OnInit, DoCheck {
  public identity;
  public token;
  public localtime: string;
  public time;
  public hours;
  public msg;
  public breadcrumbs;
  public windowSize;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  public currentUrl: string;

  constructor(
    private authorizationService: AuthenticationService,
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {
    router.events.subscribe((_: NavigationEnd) => (this.currentUrl = _.url));

    console.log(Breakpoints.Handset);
    router.events.subscribe((_: NavigationEnd) => console.log(_.url));
  }

  ngOnInit() {
    this.identity = this.authorizationService.getIdentity();
    this.getCurrentDate();
    this.decide();
  }

  ngDoCheck() {
    //el ngDoCheck se ejecutara siempre que haya un cambio en mi aplicacion
    this.identity = this.authorizationService.getIdentity();
    this.onResize();
    // this.token = this.authorizationService.getToken();
  }
  onResize() {
    this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    //console.log(this.windowSize);
  }

  getCurrentDate() {
    setInterval(() => {
      this.time = new Date(); //set time variable with current date
    }, 1000); // set it every one seconds
  }

  decide() {
    this.hours = new Date().getHours();
    console.log({ Hora: this.hours });
    if (this.hours > 6 && this.hours < 12) {
      this.msg = 'Buenos Días';
    } else if (this.hours < 19 && this.hours > 12) {
      this.msg = 'Buenas Tardes';
    } else if (this.hours > 19 && this.hours < 23) {
      this.msg = 'Buenas Noches';
    } else if (this.hours > 23 && this.hours < 24) {
      this.msg = 'Madrugada';
    } else if (this.hours < 6) {
      this.msg = 'A dormir!';
    }
  }

  redirect(url) {
    //redirección
    this.router.navigate([url]);
    setTimeout(() => {
      window.location.reload();
    }, 200);
  }

  routeLink(event) {
    console.log(event);
  }
}
