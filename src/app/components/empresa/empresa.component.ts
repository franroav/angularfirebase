import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';

//SERVICIOS
import { WebserviceService } from '../../service/webservice.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css'],
  providers: [AuthenticationService, WebserviceService],
})
export class EmpresaComponent implements OnInit, OnDestroy {
  public identity;
  public token;
  public service: any;

  constructor(
    public dialog: MatDialog,
    private _route: ActivatedRoute,
    private _router: Router,
    public webService: WebserviceService,
    private authorizationService: AuthenticationService
  ) {
    this.identity = this.authorizationService.getIdentity();
    this.token = this.authorizationService.getIdentity();
  }

  ngOnInit() {
    /** SESSION DE USUARIO IDENTIFICADO */
    if (this.identity == null) {
      this._router.navigate(['/login']);
    } else {
      this.service = this.webService.getService();
    }
  }
  ngOnDestroy() {}
}
