import { Routes } from '@angular/router';
import { DispositivosListComponent } from './components/dispositivos-list/dispositivos-list';
import { DispositivoDetailComponent } from './components/dispositivo-detail/dispositivo-detail';
import { Login } from './components/login/login';


export const routes: Routes = [
  { path: '', component: DispositivosListComponent },
  { path: 'dispositivos/:id', component: DispositivoDetailComponent },
  { path: 'login', component: Login }
];
