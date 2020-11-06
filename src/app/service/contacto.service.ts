import { Injectable } from '@angular/core';
import { Contacto } from '../model/contacto.model';
//Para las operaciones CRUD EN EL SERVICIO  debemos importar
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
//formulario
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//El observable nos ayudara a recoger la respuesta del servicio rest
import { Observable } from 'rxjs';
// GLOBAL no es mas que la url base
import { GLOBAL } from './global';

import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class ContactoService {
  public url: string;
  public contactList: AngularFireList<Contacto>;
  public contactTable: any[] = [
    {
      id: '-MBezsHRixbQUd0IeGtS',
      name: 'Francisco Javier',
      lastname: 'Roa Valenzuela',
      email: 'franroav@gmail.com',
      project: 'Sotware Develpoment',
      description:
        'Instalacion de Equipos Split Muro de 9.000,12.000,18.000,24.000 Btu',
      date: '2019-02-26 00:00:00',
    },
  ];

  constructor(
    private firebase: AngularFireDatabase,
    private datePipe: DatePipe,
    private _formBuilder: FormBuilder,
    private _http: HttpClient
  ) {
    this.url = GLOBAL.url;
  }

  // FORMULARIO
  formulario: FormGroup = new FormGroup({
    $key: new FormControl(null),
    name: new FormControl('', Validators.required),
    lastname: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    email: new FormControl('', [
      Validators.pattern('[^ @]*@[^ @]*'),
      Validators.required,
    ]),
    project: new FormControl('', Validators.required),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(30),
    ]),
    date: new FormControl('', Validators.required),
  });

  initializeFormGroup() {
    this.formulario.setValue({
      $key: null,
      name: '',
      lastname: '',
      email: '',
      project: '',
      description: '',
      date: '',
    });
  }

  getPrueba() {
    return this.contactTable;
  }

  getContacts(): Observable<any> {
    // EN FIREBASE SE TIENE UNA COLECCION Y NODES

    this.contactList = this.firebase.list('contacts');

    return this.contactList.snapshotChanges(); // me retorna un observable de la base de datos firebase
  }

  insertContact(contact) {
    this.contactList.push({
      name: contact.name,
      lastname: contact.lastname,
      email: contact.email,
      project: contact.project,
      description: contact.description,
      date:
        contact.date == ''
          ? ''
          : this.datePipe.transform(contact.date, 'yyyy-MM-dd'),
    });
  }

  updateContact(contact) {
    this.contactList.update(contact.$key, {
      name: contact.name,
      lastname: contact.lastname,
      email: contact.email,
      project: contact.project,
      description: contact.description,
      date:
        contact.date == ''
          ? ''
          : this.datePipe.transform(contact.date, 'dd-MM-yyyy'),
    });
  }

  //DELETE
  deleteEmployee($key: string) {
    this.contactList.remove($key);
  }

  populateForm(contact) {
    //this.form.setValue(employee);
    this.formulario.setValue(_.omit(contact, 'departmentName'));
  }
}
