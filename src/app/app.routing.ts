import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componentes
import { EmpresaComponent } from './components/empresa/empresa.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { LoginComponent } from './components/login/login.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { ContactFormComponent } from './components/contacto/contact-form/contact-form.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { ServiceDetailsComponent } from './components/service-details/service-details.component';
//DEFAULT
import { DefaultComponent } from './components/default/default.component';
//PERSONAS
import { PersonasComponent } from './components/personas/personas.component';
//REGIONES
import { RegionesComponent } from './components/regiones/regiones.component';
//PERSONAS DETAILS
import { PersonaDetailsComponent } from './components/personas/persona-details/persona-details.component';
//REGIONES DETAILS
import { RegionDetailsComponent } from './components/regiones/region-details/region-details.component';
//creo una propiedad appRputes que instancia la clase Routes
const appRoutes: Routes = [
  {
    path: '',
    component: DefaultComponent,
  },
  {
    path: 'personas',
    component: PersonasComponent,
  },
  {
    path: 'personas/:id',
    component: PersonaDetailsComponent,
  },
  {
    path: 'regiones',
    component: RegionesComponent,
  },
  {
    path: 'regiones/:id',
    component: RegionDetailsComponent,
  },
  {
    path: 'equipo',
    component: EmployeesComponent,
  },
  {
    path: 'servicios',
    component: EmpresaComponent,
  },
  {
    path: 'servicios/:entregable',
    component: ServiciosComponent,
  },
  {
    path: 'servicios/:entregable/:id',
    component: ServiceDetailsComponent,
  },
  {
    path: 'logout/:sure',
    component: LoginComponent,
  },
  {
    path: 'contacto',
    component: ContactoComponent,
  },
  {
    path: 'contacto-form',
    component: ContactFormComponent,
  },
  {
    path: '**',
    component: DefaultComponent,
  },
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
