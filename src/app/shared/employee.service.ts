import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
//Para las operaciones CRUD EN EL SERVICIO  debemos importar
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { DatePipe } from '@angular/common';
import { Employee } from '../model/employee.model';

import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  // en el metodo constructor la propiedad firebase contiene el objeto de la base de datos.

  constructor(
    private firebase: AngularFireDatabase,
    private datePipe: DatePipe
  ) {
    console.log(firebase);
  }

  employeeList: AngularFireList<Employee>;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    mobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
    city: new FormControl(''),
    gender: new FormControl('1'),
    department: new FormControl(0),
    hireDate: new FormControl(''),
    isPermanent: new FormControl(false),
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      fullName: '',
      email: '',
      mobile: '',
      city: '',
      gender: '1',
      department: 0,
      hireDate: '',
      isPermanent: false,
    });
  }

  getEmployees() {
    // EN FIREBASE SE TIENE UNA COLECCION Y NODES
    this.employeeList = this.firebase.list('employees');
    return this.employeeList.snapshotChanges(); // me retorna un observable de la base de datos firebase
  }

  insertEmployee(employee) {
    this.employeeList.push({
      fullName: employee.fullName,
      email: employee.email,
      mobile: employee.mobile,
      city: employee.city,
      gender: employee.gender,
      department: employee.department,
      hireDate:
        employee.hireDate == ''
          ? ''
          : this.datePipe.transform(employee.hireDate, 'yyyy-MM-dd'),
      isPermanent: employee.isPermanent,
    });
  }

  updateEmployee(employee) {
    this.employeeList.update(employee.$key, {
      fullName: employee.fullName,
      email: employee.email,
      mobile: employee.mobile,
      city: employee.city,
      gender: employee.gender,
      department: employee.department,
      hireDate:
        employee.hireDate == ''
          ? ''
          : this.datePipe.transform(employee.hireDate, 'yyyy-MM-dd'),
      isPermanent: employee.isPermanent,
    });
  }

  //DELETE
  deleteEmployee($key: string) {
    this.employeeList.remove($key);
  }

  populateForm(employee) {
    //this.form.setValue(employee);
    this.form.setValue(_.omit(employee, 'departmentName'));
  }
}
