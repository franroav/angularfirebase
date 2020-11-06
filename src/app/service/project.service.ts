import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
//Para las operaciones CRUD EN EL SERVICIO  debemos importar
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import * as _ from 'lodash';

// AngularFireDatabase --> CLASE DEL MODELO PARA LA CONEXION A LA BASE DE BASE DATOS
// AngularFireList --> LISTAR

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  departmentList: AngularFireList<any>;
  array = [];

  constructor(private firebase: AngularFireDatabase) {
    this.departmentList = this.firebase.list('department');

    // snapshotChanges me trae un observable;
    this.departmentList.snapshotChanges().subscribe((list) => {
      this.array = list.map((item) => {
        console.log(this.array);
        return {
          $key: item.key,
          ...item.payload.val(),
        };
      });
    });
  }

  getDepartmentName($key) {
    if ($key == '0') return '';
    else {
      //return _.find(this.array, (obj) => { return obj.$key == $key; })['name'];
      return _.find(this.array, (obj) => {
        return obj.$key == $key;
      });
    }
  }
}
