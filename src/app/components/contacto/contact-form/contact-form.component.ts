import { Component, OnInit } from '@angular/core';

// SERVICIO DE EMPLEADOS
import { ContactoService } from '../../../service/contacto.service';
import { ProjectService } from '../../../service/project.service';
import { NotificationService } from '../../../service/notification.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent implements OnInit {
  // cada ves que importo un servicio tengo crear una propiedad objeto de la clase del servicio
  // una ves que tengo el servicio en el metodo constructor lo puedo utilizar su propiedad

  constructor(
    public service: ContactoService,
    public projectService: ProjectService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<ContactFormComponent>
  ) {}

  ngOnInit(): void {
    this.service.getContacts();
  }

  onClear() {
    this.service.formulario.reset();
    //EVENTO CLEAR
    this.service.initializeFormGroup();
  }

  onSubmit() {
    //Para validar si el formulario es valido
    if (this.service.formulario.valid) {
      try {
        //console.log(this.service.formulario.value);
        if (!this.service.formulario.get('$key').value) {
          this.service.insertContact(this.service.formulario.value);
        } else {
          this.service.updateContact(this.service.formulario.value);
        }
        this.service.formulario.reset();
        this.service.initializeFormGroup();
        this.notificationService.success(':: Enviado Correctamente! ');
        this.onclose();
      } catch (error) {
        console.log(error);
      }
    }
  }

  onclose() {
    this.service.formulario.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }
}
