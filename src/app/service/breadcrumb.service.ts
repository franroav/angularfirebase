import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root',
})
export class BreadCrumbService {
  //public breadcrumbs: [];
  public breadcrumbs: string;
  public currentUrl: string;
  public arrUrls;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {
    router.events.subscribe((_: NavigationEnd) => (this.currentUrl = _.url));

    this.getBreadcrumbs();

    //console.log(Breakpoints.Handset);
    //console.log(this.currentUrl);
  }

  getBreadcrumbs() {
    this.router.events.subscribe((_: NavigationEnd) => {
      this.currentUrl = _.url;
    });
    return this.currentUrl;
  }

  obtainUrl(urls) {
    let arrUrl: any = [];

    urls.map((currentValue, index, array) => {
      if (currentValue != '') {
        arrUrl.push({ id: index, breadcrumbs: currentValue });
      }
    });

    return arrUrl;
  }
}
