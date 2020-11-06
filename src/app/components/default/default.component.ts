import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IlustrationsService } from '../../service/ilustration.service';
import { MapService } from '../../service/map.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css'],
})
export class DefaultComponent implements OnInit, DoCheck {
  public identity;
  public name: string;
  public email: string;
  public family_name: string;
  public given_name: string;
  public ilustrations;
  public title: string;
  public windowSize;

  //MAPS
  public position = {
    lat: -36.826,
    lng: -73.049,
  };

  public label: object = {
    color: 'red',
    text: 'Marcador',
  };

  constructor(
    private authorizationService: AuthenticationService,
    private _route: ActivatedRoute,
    private _router: Router,
    private ilustrationsService: IlustrationsService,
    public maplocation: MapService
  ) {
    this.title = 'Inicio';
  }

  ngOnInit(): void {
    //
    this.identity = this.authorizationService.getIdentity();
    this.ilustrations = this.ilustrationsService.obtenerIlustrations();
    this.callLocalStorage();
    // console.log(this.ilustrations);
    // console.log(window.location.hash);
  }

  ngDoCheck() {
    //el ngDoCheck se ejecutara siempre que haya un cambio en mi aplicacion
    this.onResize();
    this.apiLocation();
  }

  callLocalStorage() {
    //get localStorage
    if (localStorage.getItem('googleIdentity') != null) {
      let userStorage = JSON.parse(localStorage.getItem('googleIdentity'));

      const { name, email, family_name, given_name } = userStorage;

      this.name = name;
      this.email = email;
      this.family_name = family_name;
      this.given_name = given_name;
    }
  }

  onResize() {
    this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    //console.log(this.windowSize);
  }

  apiLocation() {
    //const geolocation = this.maplocation.getPosition();
    //console.log(geolocation);
    //this.position.lat = Number(geolocation[0].latitude);
    //this.position.lng = Number(geolocation[1].longitude);
  }
}
