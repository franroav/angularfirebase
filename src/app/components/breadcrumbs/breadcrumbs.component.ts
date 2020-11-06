import { Component, OnInit } from '@angular/core';
//ROUTER
import { Router, ActivatedRoute, Params } from '@angular/router';
import { StateService } from './../../state.service';
import { Observable } from 'rxjs';
//SERVICIO
import { AuthenticationService } from '../../service/authentication.service';
import { BreadCrumbService } from '../../service/breadcrumb.service';
//MODELO
import { Breadcrumb } from '../../model/breadcrumb.model';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css'],
  providers: [AuthenticationService, StateService],
})
export class BreadcrumbsComponent implements OnInit {
  //public profile: Profile;

  // rxjs
  public breads$: Observable<any>;
  public name$: Observable<any>;
  public breadcrumbs;
  public breads: Breadcrumb;
  public baseurl;

  constructor(
    //public profileService: ProfileService,
    private authorizationService: AuthenticationService,
    public stateservice: StateService,
    public breadscrumbservice: BreadCrumbService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.baseUrl();
  }

  ngOnInit(): void {
    this.breadcrumbs = this.breadscrumbservice.getBreadcrumbs();

    // rxjs
    this.breads$ = this.stateservice.select('breads');
    //this.name$ = this.stateservice.select('name');
    //call the method that include state managment

    const stringUrl = this.breadcrumbs;

    let arrUrl: any = [];

    if (stringUrl !== 'undefined') {
      let arrUrls = stringUrl.split('/');
      let arrUrl = [];

      arrUrls.map((currentValue, index, array) => {
        if (currentValue != '') {
          arrUrl.push({ id: index, breadcrumbs: currentValue });
        }
      });

      this.addData(arrUrl);

      let fullUrl: any = [];

      arrUrl.map((currentValue, index, array) => {
        switch (index) {
          case 0:
            fullUrl.push({
              id: index,
              breadcrumbs: '/' + currentValue.breadcrumbs,
              path: currentValue.breadcrumbs,
            });
            break;
          case 1:
            fullUrl.push({
              id: index,
              breadcrumbs:
                fullUrl[0].breadcrumbs + '/' + currentValue.breadcrumbs,
              path: currentValue.breadcrumbs,
            });
            break;
          case 2:
            fullUrl.push({
              id: index,
              breadcrumbs:
                fullUrl[1].breadcrumbs + '/' + currentValue.breadcrumbs,
              path: currentValue.breadcrumbs,
            });
            break;
          case 3:
            fullUrl.push({
              id: index,
              breadcrumbs:
                fullUrl[2].breadcrumbs + '/' + currentValue.breadcrumbs,
              path: currentValue.breadcrumbs,
            });
            break;
        }
      });

      this.breads = fullUrl;
    }
  }

  addData(arrUrl) {
    this.stateservice.dispatch({ key: 'breads', payload: arrUrl });
  }
  baseUrl() {
    this.baseurl = window.location.href;
  }
}
