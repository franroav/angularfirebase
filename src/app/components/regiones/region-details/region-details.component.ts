import { Component, OnInit, OnDestroy } from '@angular/core';
//SERVICIO
import { RegionesService } from '../../../service/regiones.service';
//ROUTER
import { Router, ActivatedRoute, Params } from '@angular/router';
// MODEL
import { Persona } from '../../../model/persona.model';

@Component({
  selector: 'app-region-details',
  templateUrl: './region-details.component.html',
  styleUrls: ['./region-details.component.css'],
})
export class RegionDetailsComponent implements OnInit, OnDestroy {
  public regiones: any;
  public region: any;
  constructor(
    public regionService: RegionesService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    if (localStorage.getItem('regiondetail') === null) {
      this._route.params.subscribe((params) => {
        const routeId = Number(params['id']);

        console.log(params['id']);
        this.regiones = this.regionService.getRegiones().subscribe((res) => {
          res.map((region) => {
            if (region.id === routeId) {
              //console.log(persona);
              this.Region(region);
            }
          });
        });
      });
    } else {
      const regionLocal = JSON.parse(localStorage.getItem('regiondetail'));
      this.Region(regionLocal);
    }
  }

  ngOnInit(): void {}
  Region(region) {
    this.region = region;
    console.log(this.region);
  }

  ngOnDestroy() {
    localStorage.removeItem('regiondetail');
  }
}
