import { Component, OnInit, ViewChild } from '@angular/core';
import { RegionesService } from '../../service/regiones.service';

//DATATABLE
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-regiones',
  templateUrl: './regiones.component.html',
  styleUrls: ['./regiones.component.css'],
  providers: [RegionesService],
})
export class RegionesComponent implements OnInit {
  public personas: any;
  listData: MatTableDataSource<any>;

  displayedColumns: string[] = ['region', 'comunas', 'actions'];
  searchKey: string;
  //Directivas, que puedo utilizar en mi Html
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public regionesService: RegionesService) {}

  ngOnInit(): void {
    this.getAllRegiones();
  }

  getAllRegiones() {
    this.regionesService.getRegiones().subscribe((res) => {
      const regiones = this.validRegionandComunas(res);

      //console.log(arrRegiones);

      this.listData = new MatTableDataSource(regiones);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    });

    // console.log(this.personas);
  }

  validRegionandComunas(res) {
    let validar = /^[A-Za-z- áéíóúü]{4,}$/;
    let arrRegiones = [];

    res.map((region) => {
      //COMUNAS
      const validComunas = this.validComunas(region.comunas, validar);

      // test string Region
      const testRegiones = validar.test(region.nombre);
      // condicion string Region
      if (!testRegiones) {
        const fixRegion = region.nombre.replace(/[^A-Za-z0-9]/g, '');

        switch (fixRegion) {
          case fixRegion:
            const validComuna = fixRegion.includes('VALPARASO')
              ? 'VALPARAISO'
              : fixRegion.includes('DELBIOBO')
              ? 'DEL BIO BIO'
              : false;

            arrRegiones.push({
              id: region.id,
              nombre: validComuna,
              comunas: validComunas,
            });
            break;
          default:
            //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
            break;
        }
      } else {
        arrRegiones.push({
          id: region.id,
          nombre: region.nombre,
          comunas: validComunas,
        });
      }
    });
    return arrRegiones;
  }

  validComunas(comunas, validar) {
    const arrFixComunas = [];

    comunas.map((comuna) => {
      const testComuna = validar.test(comuna.nombre);

      if (!testComuna) {
        //console.log(comuna.nombre);
        const fixComuna = comuna.nombre.replace(/[^A-Za-z0-9]/g, '');

        switch (fixComuna) {
          case fixComuna:
            const validComuna = fixComuna.includes('Valparaso')
              ? 'Valparaíso'
              : fixComuna.includes('Concn')
              ? 'Concon'
              : fixComuna.includes('JuanFernndez')
              ? 'Juan Fernandez'
              : fixComuna.includes('Puchuncav')
              ? 'Puchuncavi'
              : fixComuna.includes('ViadelMar')
              ? 'Viña Del Mar'
              : fixComuna.includes('Concepcin')
              ? 'Concepción'
              : fixComuna.includes('Conchal')
              ? 'Conchali'
              : fixComuna.includes('EstacinCentral')
              ? 'Estación Central'
              : fixComuna.includes('uoa')
              ? 'Nuñoa'
              : fixComuna.includes('Pealoln')
              ? 'Peñalolen'
              : false;

            arrFixComunas.push({
              id: comuna.id,
              nombre: validComuna,
            });

            break;
          default:
            //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
            break;
        }
      } else {
        arrFixComunas.push({
          id: comuna.id,
          nombre: comuna.nombre,
        });
      }
    });
    return arrFixComunas;
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onView(region) {
    if (localStorage.getItem('regiondetail') === null) {
      localStorage.setItem('regiondetail', JSON.stringify(region));
    } else {
      localStorage.removeItem('regiondetail');

      localStorage.setItem('regiondetail', JSON.stringify(region));
    }

    console.log(region);
  }
}
