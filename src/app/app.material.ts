// TENDRA LA TAREAS DE IMPORTAR LOS MODULOS NECESARIOS

// VOY A IMPORTAR DESDE EL CORE DE ANGULAR

import { NgModule } from '@angular/core';

// 1 quiero importar algo desde "BOTON" @angular/material/button
// 2 en el decorador NgModule importo el componente

//*********COMPONENTES***********

//boton
import { MatButtonModule } from '@angular/material/button';
//Tabla
import { MatTableModule } from '@angular/material/table';
//CARDS
import { MatCardModule } from '@angular/material/card';
//Toolbar
import { MatToolbarModule } from '@angular/material/toolbar';
//Input
import { MatInputModule } from '@angular/material/input';
//select
import { MatSelectModule } from '@angular/material/select';
//Modal Dialog
import { MatDialogModule } from '@angular/material/dialog';
//GRID-LIST
import { MatGridListModule } from '@angular/material/grid-list';
// Radio Button
import { MatRadioModule } from '@angular/material/radio';
//checkbox
import { MatCheckboxModule } from '@angular/material/checkbox';
//Form Field
import { MatFormFieldModule } from '@angular/material/form-field';
//Date Picker
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
//SideBar
import { MatSidenavModule } from '@angular/material/sidenav';
//list
import { MatListModule } from '@angular/material/list';
//ICON
import { MatIconModule } from '@angular/material/icon';
// SNACKBAR
import { MatSnackBarModule } from '@angular/material/snack-bar';
//SORT
import { MatSortModule } from '@angular/material/sort';
//PAGINATOR
import { MatPaginatorModule } from '@angular/material/paginator';
/*import {MatNativeDateModule} from '@angular/material/core';
import { MatMomentDateModule } from "@angular/material/datepicker";
*/
// TREE
import { MatTreeModule } from '@angular/material/tree';
// TABS
import { MatTabsModule } from '@angular/material/tabs';
//STEPPER
import { MatStepperModule } from '@angular/material/stepper';
//MENU
import { MatMenuModule } from '@angular/material/menu';
//EXPANSION PANEL
import { MatExpansionModule } from '@angular/material/expansion';

//Decorador
@NgModule({
  imports: [
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatGridListModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatSnackBarModule,
    MatSortModule,
    MatPaginatorModule,
    MatTreeModule,
    MatTabsModule,
    MatStepperModule,
    MatMenuModule,
    MatExpansionModule,
  ],
  exports: [
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatGridListModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatSnackBarModule,
    MatSortModule,
    MatPaginatorModule,
    MatTreeModule,
    MatTabsModule,
    MatStepperModule,
    MatMenuModule,
    MatExpansionModule,
  ],
  providers: [],
})

// exporto mi clase
export class MaterialModule {}
