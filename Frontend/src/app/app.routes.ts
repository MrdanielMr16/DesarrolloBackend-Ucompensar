import { Routes } from '@angular/router';
import { DispositivosListComponent } from './components/dispositivos-list/dispositivos-list';
import { DispositivoDetailComponent } from './components/dispositivo-detail/dispositivo-detail';
import { Login } from './components/login/login';
import { DispositivosForm } from './components/dispositivos-form/dispositivos-form';


export const routes: Routes = [
  { path: '', component: DispositivosListComponent },
  { path: 'login', component: Login },
  { path: 'dispositivos/nuevo', component: DispositivosForm },
  { path: 'dispositivos/:id', component: DispositivoDetailComponent },
  { path: 'dispositivos/editar/:id', component: DispositivosForm },
];
