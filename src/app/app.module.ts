import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
//FIREBASE CLASES
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

//GOOGLE MAPS
import { GoogleMapsModule } from '@angular/google-maps';

// voy a importar la clase materialModule PARA ASPECTO DE MI APLICACION
import { MaterialModule } from './app.material';
// import la clase httpclinet PARA LOS SERVICIOS REST
import { HttpClientModule } from '@angular/common/http';

// RUTAS
import { routing, appRoutingProviders } from './app.routing';
//REACTIVE FORMS
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// EMPLOYEE SERVICE
import { EmployeeService } from './shared/employee.service';
//FIREBASE AUTH SERVICE
import { AuthenticationService } from './service/authentication.service';

// DEPARTMENT SERVICE
import { DepartmentService } from './shared/department.service';

//EMPLEDOS
import { EmployeeComponent } from './components/employees/employee/employee.component';
import { EmployeesComponent } from './components/employees/employees.component';

//FIREBASE ENVIRONMENT CONFIG
import { environment } from '../environments/environment';
//EMPRESA
import { EmpresaComponent } from './components/empresa/empresa.component';
//LOGIN COMPONENT
import { LoginComponent } from './components/login/login.component';

//SIDEBAR
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

//MODAL
import { MatDialogModule } from '@angular/material/dialog';

//DATATABLE ANGULAR
import { DataTablesModule } from 'angular-datatables';

// TREE
import { MatTreeModule } from '@angular/material/tree';

// TOOLTIP
import { MatTooltipModule } from '@angular/material/tooltip';

// SPINNER
import { NgxSpinnerModule } from 'ngx-spinner';

//COMPONENTES

import { EmployeeListComponent } from './components/employees/employee-list/employee-list.component';
import { MatComfirmDialogComponent } from './components/mat-comfirm-dialog/mat-comfirm-dialog.component';
import { DefaultComponent } from './components/default/default.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { ContactFormComponent } from './components/contacto/contact-form/contact-form.component';
import { ContactListComponent } from './components/contacto/contact-list/contact-list.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { ServiceDetailsComponent } from './components/service-details/service-details.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { RegionesComponent } from './components/regiones/regiones.component';
import { PersonasComponent } from './components/personas/personas.component';
import { PersonaDetailsComponent } from './components/personas/persona-details/persona-details.component';
import { RegionDetailsComponent } from './components/regiones/region-details/region-details.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    EmployeesComponent,
    EmpresaComponent,
    LoginComponent,
    MainNavComponent,
    EmployeeListComponent,
    MatComfirmDialogComponent,
    DefaultComponent,
    ContactoComponent,
    ContactFormComponent,
    ContactListComponent,
    ServiciosComponent,
    ServiceDetailsComponent,
    BreadcrumbsComponent,
    RegionesComponent,
    PersonasComponent,
    PersonaDetailsComponent,
    RegionDetailsComponent,
  ],
  entryComponents: [
    MatDialogModule,
    EmployeeComponent,
    MatComfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    routing,
    appRoutingProviders,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FlexLayoutModule,
    MatDialogModule,
    MatTreeModule,
    GoogleMapsModule,
    DataTablesModule,
    MatTooltipModule,
    NgxSpinnerModule,
  ],
  providers: [
    EmployeeService,
    AuthenticationService,
    DepartmentService,
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
