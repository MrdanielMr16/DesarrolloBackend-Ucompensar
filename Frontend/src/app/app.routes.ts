import { Routes } from '@angular/router';
import { DispositivosListComponent } from './components/dispositivos-list/dispositivos-list';
import { DispositivoDetailComponent } from './components/dispositivo-detail/dispositivo-detail';


export const routes: Routes = [
  { path: '', component: DispositivosListComponent },
  { path: 'dispositivos/:id', component: DispositivoDetailComponent }
];
