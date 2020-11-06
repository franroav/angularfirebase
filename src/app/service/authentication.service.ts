/** FIREBASE */
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import * as functions from 'firebase/functions';
//import * as admin from 'firebase-admin'; // este paquete solo se puede ocupar en el backend con nodejs

//ROLES DE USUARIO
//Para las operaciones CRUD EN EL SERVICIO  debemos importar
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { DatePipe } from '@angular/common';

// ROUTER
import { Router, ActivatedRoute, Params } from '@angular/router';
// HTTP CLIENT para servicio rest
import { HttpClient, HttpHeaders } from '@angular/common/http';
//El observable nos ayudara a recoger la respuesta del servicio rest
import { Observable } from 'rxjs';
// GLOBAL , url base para servicio en local
import { GLOBAL } from './global';
//MODELO
import { User } from '../model/user.model';
// SERVICIO
import { NotificationService } from './notification.service';
import { Oauth } from '../model/oauth.model';
//import { error } from 'console';

@Injectable()
export class AuthenticationService {
  public url: string;
  public user: User;
  public userState: Observable<firebase.User>;
  public token;
  public identity: Oauth;
  public app: string;
  public googleIdentity;
  public role: boolean;

  constructor(
    private afAuth: AngularFireAuth,
    public _http: HttpClient,
    public notificationService: NotificationService,
    private firebase: AngularFireDatabase,
    private datePipe: DatePipe,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.userState = afAuth.authState;
    this.url = GLOBAL.url;
  }

  // ME RETORNA EL OBJETO DE FIREBASE
  loginGoogle() {
    try {
      // accion de logear me retornara una PROMESA
      this.afAuth.auth
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())

        .then((data) => {
          // VALIDA CORREO CON OBJETO DOCUMENTO USUARIO Y ROLES
          this.getRolesUser(data.additionalUserInfo.profile, data.credential);
        })
        .catch((error) => {
          this.notificationService.warn('Error!');

          console.log(error);
          return;
        });
    } catch (error) {
      console.log(error);
      return;
    }
  }

  getRolesUser(user, credential) {
    const lista = this.firebase.list('users');

    lista.snapshotChanges().subscribe((list) => {
      let array = list.map((item) => {
        //obtengo mi objeto de la base de datos
        if (item.payload.val()['email'] === user.email) {
          let roles = item.payload.val()['roles'];

          let role =
            roles.administrador === true && roles.subscriptor === false
              ? roles.administrador
              : roles.administrador === false && roles.subscriptor === true
              ? false
              : false;

          this.role = role;

          let googleUser = {
            email: user.email,
            family_name: user.family_name,
            given_name: user.given_name,
            id: user.id,
            name: user.name,
            picture: user.picture,
            accessToken: credential.accessToken,
            idToken: credential.idToken,
            role: role,
            status: 'success',
          };

          // Metodo Local Storage

          this.storageGoogleUser(googleUser);
        }
      });
    });
  }

  storageGoogleUser(user) {
    //OBJETO USUARIO LOCALSTORAGE

    if (localStorage.getItem('googleIdentity') === null) {
      localStorage.setItem('googleIdentity', JSON.stringify(user));

      this.googleIdentity = user;

      this.notificationService.success('Conectado!');
      this.userRole(user);
    } else {
      let googleUser = JSON.parse(localStorage.getItem('googleIdentity'));

      this.googleIdentity = googleUser;

      console.log(this.googleIdentity);

      this.notificationService.success('Conectado!');

      this.userRole(user);
    }
  }

  userRole(user) {
    console.log(user);
    this._router.navigate(['servicios']);
  }

  //METODO PARA OBTENER LA IDENTIDAD DEL USUARIO IDENTIFICADO EN EL LOCALSTRORAGE

  getIdentity() {
    let googleIdentity = JSON.parse(localStorage.getItem('googleIdentity'));

    if (googleIdentity != 'undefined') {
      this.googleIdentity = googleIdentity;
    } else {
      this.googleIdentity = null;
    }

    return this.googleIdentity;
  }

  getAdminList() {
    // crear collection de administradores de la aplicación desde Firebase para producción.
    return [
      {
        id: 1,
        email: 'webkonce@gmail.com',
        estado: 'administrador',
      },
    ];
  }
  //METODO PARA OBTENER EL TOKEN DEL USUARIO IDENTIFICADO EN EL LOCALSTRORAGE
  getToken() {
    let googleIdentity = JSON.parse(localStorage.getItem('googleIdentity'));

    let token = googleIdentity.idToken;

    if (token != 'undefined') {
      this.token = token;
    } else {
      this.token = null;
    }
  }

  async grantModeratorRole(email: string): Promise<void> {
    //const user = await admin.auth().getUserByEmail(email);
    //console.log(user);
  }

  // ME RETORNA UN OBSERVABLE DE FIREBASE USUARIOS
  pruebasLoginGoogle() {
    const lista = this.firebase.list('users');

    return lista.snapshotChanges();
  }
}
