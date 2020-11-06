import { Component, OnInit, ViewChild, DoCheck } from '@angular/core';
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
//MODELO
import { Stack } from '../../model/stack.model';
//SERVICIO PROFILE
import { WebserviceService } from '../../service/webservice.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css'],
  providers: [AuthenticationService],
})
export class ServiciosComponent implements OnInit, DoCheck {
  displayedColumns: string[] = ['id', 'desarrollo', 'actions'];
  public dataTable: MatTableDataSource<Stack>;
  public service: any;
  searchKey: string;
  public windowSize;

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
      this.service = this.webService.obtenerProfile(
        params['entregable']
      )[0].ejecutables;
      console.log(this.service);
    });
  }

  ngOnInit(): void {
    this.dataTable = new MatTableDataSource(this.service);
    this.dataTable.sort = this.sort;
    this.dataTable.paginator = this.paginator;
  }
  ngDoCheck() {
    this.onResize();
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
  onResize() {
    this.windowSize = { x: window.innerWidth, y: window.innerHeight };
  }
}
