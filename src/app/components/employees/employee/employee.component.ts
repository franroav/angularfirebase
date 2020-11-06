import { Component, OnInit } from '@angular/core';
// SERVICIO DE EMPLEADOS
import { EmployeeService } from '../../../shared/employee.service';
//SERVICIO DE DEPARTAMENTOS
import { DepartmentService } from '../../../shared/department.service';
//SERVICIO DE NOFICACIONES
import { NotificationService } from '../../../shared/notification.service';
//MODAL
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  constructor(
    public service: EmployeeService,
    public departmentService: DepartmentService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<EmployeeComponent>
  ) {}

  ngOnInit(): void {
    this.service.getEmployees();
  }

  onClear() {
    this.service.form.reset();
    //EVENTO CLEAR
    this.service.initializeFormGroup();
  }

  onSubmit() {
    //Para validar si el formulario es valido
    if (this.service.form.valid) {
      //console.log(this.service.form.value);
      try {
        if (!this.service.form.get('$key').value)
          this.service.insertEmployee(this.service.form.value);
        else this.service.updateEmployee(this.service.form.value);
        this.service.form.reset();
        this.service.initializeFormGroup();
        this.notificationService.success(':: Enviado Correctamente');
        this.onclose();
      } catch (error) {
        console.log(error);
      }
    }
  }

  onclose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }
}
