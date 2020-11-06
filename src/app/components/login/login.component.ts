import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NotificationService } from '../../service/notification.service';
import { Oauth } from '../../model/oauth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService],
})
// siempre al incluir un servicio el decorador debe contener el provider para que el servicio este disponible para la clase.
export class LoginComponent implements OnInit {
  page_title: string = 'Login de Usuario';

  userToken: string;

  public googleIdentity;
  public userRole;
  public id: number;
  public name: string;
  public surname: string;
  public email: string;
  public password: string;
  public gettoken: string; // con gettoken = true, recibo el objeto del usuario identificado, si no recibo el token
  public token;
  public identity;
  public status: string;

  constructor(
    private authorizationService: AuthenticationService,
    private _route: ActivatedRoute,
    private _router: Router,
    public notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.logout();
  }

  /** LOGIN */
  googletry() {
    //let login = this.authorizationService.loginGoogle();
    let login = this.loginButton();
  }

  loginButton() {
    this.authorizationService.loginGoogle();
  }

  logout() {
    //recogere los paremetros que me lleguen por la url
    this._route.params.subscribe((params) => {
      console.log(params);
      // lo convierto en un entero con anteceder el +, params
      let logout = +params['sure']; // esto me da un valor enterp y devuelve el integer 1
      console.log(logout);

      if (logout == 1) {
        //remove localstorage
        localStorage.removeItem('googleIdentity');
        localStorage.removeItem('breadcrumb');
        //localStorage.removeItem('token');

        // vacío las las variable agregandole null
        this.identity = null;
        this.token = null;

        //NOTIFICACION
        this.notificationService.warn('Descontado!');

        //redirección
        this._router.navigate(['']);
      }
    });
  }

  callPruebaButtonRegister(): void {
    let user = this.googletry();

    this.userRole = user;
    //console.log(this.userRole);
  }
}
