import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../../../shared/employee.service';
import { DepartmentService } from '../../../shared/department.service';
import { NotificationService } from '../../../shared/notification.service';
import { DialogService } from '../../../shared/dialog.service';

//DATATABLE
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
//COMPONENT
import { EmployeeComponent } from '../employee/employee.component';

//import {MatComfirmDialogComponent} from '../../mat-comfirm-dialog/mat-comfirm-dialog.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  constructor(
    private service: EmployeeService,
    private departmentService: DepartmentService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogService: DialogService
  ) {}

  listData: MatTableDataSource<any>;
  // el array puede
  displayedColumns: string[] = [
    'fullName',
    'email',
    'mobile',
    'city',
    'departmentName',
    'actions',
  ];

  searchKey: string;
  //Directivas, que puedo utilizar en mi Html
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    // al llamar al servicio y el meyodo get employeess lo que hago es traer un obserable al cual me suscribo

    this.service.getEmployees().subscribe((list) => {
      let arrEmployee = list.map((item) => {
        // item.payload.val()['department] == $key
        let departmentName = this.departmentService.getDepartmentName(
          item.payload.val()['department']
        );
        console.log(departmentName.name);
        return {
          $key: item.key,
          departmentName,
          ...item.payload.val(),
        };
      });
      // entregar el array la clases MatTableDataSource que necesita un array para inicializar, ver en la documentacion
      this.listData = new MatTableDataSource(arrEmployee);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;

      console.log(arrEmployee);
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
    // en app.module.ts se pasa en entryComponents: [EmployeeComponent]
    this.dialog.open(EmployeeComponent, dialogConfig);
  }

  onEdit(row) {
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.height = '400px';
    this.dialog.open(EmployeeComponent, dialogConfig);
  }

  onDelete($key) {
    this.dialogService
      .openConfirmDialog('Are you sure to delete this record ?')
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.service.deleteEmployee($key);
          this.notificationService.warn('! Deleted successfully');
        }
      });
  }
}
