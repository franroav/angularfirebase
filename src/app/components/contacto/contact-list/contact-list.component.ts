import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactoService } from '../../../service/contacto.service';
import { ProjectService } from '../../../service/project.service';
import { NotificationService } from '../../../service/notification.service';
import { DialogService } from '../../../service/dialog.service';
import { AuthenticationService } from '../../../service/authentication.service';

//DATATABLE
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ContactFormComponent } from '../../contacto/contact-form/contact-form.component';

import { MatComfirmDialogComponent } from '../../mat-comfirm-dialog/mat-comfirm-dialog.component';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  constructor(
    private service: ContactoService,
    private authorizationService: AuthenticationService,
    private departmentService: ProjectService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogService: DialogService
  ) {}

  public admins;
  public identity;
  listData: MatTableDataSource<any>;
  // el array puede
  displayedColumns: string[] = [
    'name',
    'lastname',
    'email',
    'project',
    'description',
    'date',
    'actions',
  ];

  searchKey: string;
  //Directivas, que puedo utilizar en mi Html
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    // al llamar al servicio y el meyodo get employeess lo que hago es traer un obserable al cual me suscribo

    //console.log(this.service.getEmployees()); /**/
    this.identity = this.authorizationService.getIdentity();
    this.admins = this.authorizationService.getAdminList();
    this.service.getContacts().subscribe((list) => {
      let array = [];
      list.map((item) => {
        let departmentName = this.departmentService.getDepartmentName(
          item.payload.val()['department']
        );

        this.admins.map((admin) => {
          if (
            item.payload.val()['email'] === this.identity.email &&
            this.identity.email !== admin.email
          ) {
            array.push({
              $key: item.key,
              departmentName,
              ...item.payload.val(),
            });
          } else if (this.identity.email === admin.email) {
            array.push({
              $key: item.key,
              departmentName,
              ...item.payload.val(),
            });
          }
        });
      });
      // entregar el array la clases MatTableDataSource que necesita un array para inicializar, ver en la documentacion
      this.listData = new MatTableDataSource(array);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator; /**/

      this.listData.filterPredicate = (data, filter) => {
        return this.displayedColumns.some((ele) => {
          return (
            ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1
          );
        });
      };

      console.log(array);
    });
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.height = '400px';
    // para agregar un modulo a un componente hay que agregar el componenete a module.ts para que este accecible a otros componentes
    // en app.module.ts se pasa en entryComponents: [ContactFormComponent]
    this.dialog.open(ContactFormComponent, dialogConfig); /**/
  }

  onEdit(row) {
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.height = '400px';
    this.dialog.open(ContactFormComponent, dialogConfig);
  }

  onDelete($key) {
    this.dialogService
      .openConfirmDialog('Estas seguro de eliminar el registro ?')
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.service.deleteEmployee($key);
          this.notificationService.warn('! Eliminado Correctamente !');
        }
      });
  }
}
