import { Component, OnInit, ViewChild } from '@angular/core';
//SERVICIO
import { PersonasService } from '../../service/personas.service';

//DATATABLE
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css'],
  providers: [PersonasService],
})
export class PersonasComponent implements OnInit {
  public personas: any;
  listData: MatTableDataSource<any>;

  displayedColumns: string[] = [
    'nombre',
    'apellido',
    'telefono',
    'rut',
    'direccion',
    'comuna',
    'estado',
    'actions',
  ];

  searchKey: string;
  //Directivas, que puedo utilizar en mi Html
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public personasService: PersonasService) {}

  ngOnInit(): void {
    this.getAllPersonas();
  }

  getAllPersonas() {
    this.personasService.getPersonas().subscribe((res) => {
      console.log(res);

      let validar = /^[A-Za-z- áéíóúü]{4,}$/;
      let arrPersonas = [];

      res.map((persona) => {
        //COMUNAS
        //const validComunas = this.validComunas(region.comunas, validar);

        // test string
        const testNombre = validar.test(persona.nombre);
        const testApellido = validar.test(persona.apellido);
        const testCalle = validar.test(persona.direccion.calle);
        // clean string
        const fixNombrePersona = persona.nombre.replace(/[^A-Za-z0-9]/g, '');
        const fixApellidoPersona = persona.apellido.replace(
          /[^A-Za-z0-9]/g,
          ''
        );
        const fixComunaPersona = persona.direccion.comuna.nombre.replace(
          /[^A-Za-z0-9]/g,
          ''
        );
        const fixCallePersona = persona.direccion.calle.replace(
          /[^A-Za-z0-9]/g,
          ''
        );

        const Persona = this.fixObject(
          persona,
          fixNombrePersona,
          fixApellidoPersona,
          fixComunaPersona,
          fixCallePersona
        );

        arrPersonas.push(Persona);
      });

      this.listData = new MatTableDataSource(arrPersonas);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    });

    // console.log(this.personas);
  }

  fixObject(persona, nombre, apellido, comuna, calle) {
    const validName = this.fixNombrePersona(nombre);
    const validLastName = this.fixApellidoPersona(apellido);
    const validComuna = this.fixComunaPersona(comuna);
    const validCalle = this.fixCallePersona(calle);

    const validPersona = {
      id: persona.id,
      nombre: validName,
      apellido: validLastName,
      telefono: persona.telefono,
      rut: persona.rut,
      direccion: {
        calle: validCalle,
        comuna: {
          id: persona.direccion.comuna.id,
          nombre: validComuna,
        },
        numero: persona.direccion.numero,
      },
      activo: persona.activo,
    };
    return validPersona;
  }

  fixNombrePersona(nombre) {
    if (nombre == 'Fransico' || nombre == 'JuanManuel') {
      const personName = nombre.includes('Fransico')
        ? 'Francisco'
        : nombre.includes('JuanManuel')
        ? 'Juan Manuel'
        : nombre;
      return personName;
    } else {
      return nombre;
    }
  }
  fixApellidoPersona(apellido) {
    if (apellido == 'Arvalo') {
      const validLastName = apellido.includes('Arvalo')
        ? 'Arevalo'
        : apellido.includes('Yaez')
        ? 'Yañez'
        : apellido;
      return validLastName;
    } else {
      return apellido;
    }
  }

  fixComunaPersona(comuna) {
    const validComuna = comuna.includes('uoa')
      ? 'Nuñoa'
      : comuna.includes('Concn')
      ? 'Concon'
      : comuna.includes('GeneralLagos')
      ? 'General Lagos'
      : comuna;

    return validComuna;
  }

  fixCallePersona(calle) {
    const validCalle = calle.includes('Coln') ? 'Colon' : calle;

    return validCalle;
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onView(profile) {
    if (localStorage.getItem('personadetail') === null) {
      localStorage.setItem('personadetail', JSON.stringify(profile));
    } else {
      localStorage.removeItem('personadetail');

      localStorage.setItem('personadetail', JSON.stringify(profile));
    }

    console.log(profile);
  }
}
