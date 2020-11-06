import { Component, OnInit, ViewChild } from '@angular/core';
//LARAVEL
import { AuthenticationService } from '../../service/authentication.service';
//ROUTER
import { Router, ActivatedRoute, Params } from '@angular/router';
//DATA-TABLE
import { MatTableDataSource } from '@angular/material/table';
//SORT
import { MatSort } from '@angular/material/sort';
//PAGINADOR
import { MatPaginator } from '@angular/material/paginator';

//SERVICIO PROFILE
import { WebserviceService } from '../../service/webservice.service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css'],
  providers: [AuthenticationService],
})
export class ServiceDetailsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'desarrollo', 'actions'];
  public dataTable: MatTableDataSource<any>;
  public service: any;
  public servicefrontend: any;
  public servicebackend: any;
  public todaydate: string;
  public afterdate: string;
  public hours: number;
  public minutes: number;
  public time: string;
  public clock: string;
  searchKey: string;

  //Directivas, que puedo utilizar en mi Html
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public webService: WebserviceService,
    private authorizationService: AuthenticationService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this._route.params.subscribe((params) => {
      console.log(params['entregable']);
      console.log(params['id']);

      // solicitar servicio
      this.service = this.webService.obtenerServiceDetails(
        params['entregable'],
        params['id']
      )[0];

      // solicitar detalle servicio
      this.servicefrontend = this.webService.getFrontEnd(
        this.service.front_id
      )[0];

      this.servicebackend = this.webService.getBackEnd(this.service.back_id)[0];

      console.log(this.service);
      console.log(this.servicefrontend);
      console.log(this.servicebackend);
    });
  }

  ngOnInit(): void {
    this.getDate();
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.dataTable.filter = this.searchKey.trim().toLowerCase();
  }

  onView(desarrollo) {
    console.log(desarrollo);
  }
  getDate() {
    // window.location.reload();

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    this.hours = new Date().getHours();
    this.minutes = new Date().getMinutes();

    if (this.hours <= 12) {
      this.clock = 'AM';
    } else if (this.hours > 12) {
      this.clock = 'PM';
    }

    if (this.minutes < 10) {
      this.time = this.hours + ':' + '00' + ' ' + this.clock;
    } else {
      this.time = this.hours + ':' + '00' + ' ' + this.clock;
    }

    this.todaydate = mm + '/' + dd + '/' + yyyy;
    this.afterdate = mm + '/' + dd + '/' + yyyy;
  }

  meeting(evento) {
    console.log(evento);
    console.log(evento);
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    window.location.href = `https://calendar.google.com/calendar/u/0/r/eventedit?text=Agendar+Reuni%C3%B3n&dates=${
      yyyy + mm + dd + 'T110000' + '/' + yyyy + mm + dd + 'T120000'
    }&ctz=America/Santiago&details=Agendar+Reuni%C3%B3n+para+Proyecto+SPA+con+www.webkonce.cl+https://www.webkonce.cl+&location=Internet&pli=1&uid=1603480671addeventcom&sf=true&output=xml`; /**/
  }
}
