import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from './service/authentication.service';
import { User } from './model/user.model';
import { StateService } from './state.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angularkonce';
  public identity;
  public token;

  // rxjs
  public data$: Observable<any>;
  public name$: Observable<any>;

  constructor(
    private authorizationService: AuthenticationService,
    private spinnerService: NgxSpinnerService,
    public stateservice: StateService
  ) {}

  ngOnInit() {
    this.identity = this.authorizationService.getIdentity();
    this.token = this.authorizationService.getToken();
    this.spinner();

    // rxjs
    this.data$ = this.stateservice.select('data');

    //call the method that include state managment
    this.addData();
  }

  spinner(): void {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
    }, 2000);
  }

  addData() {
    this.stateservice.dispatch({ key: 'data', payload: this.identity });
  }
}
