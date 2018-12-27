import {RouterModule, Routes} from '@angular/router';
import {NosotrosComponent, ConsultasComponent, ContactosComponent, LoginComponent} from './components/rutas';

const app_routes: Routes = [
    {
      path: 'admin',
      loadChildren: './admin/admin.module#AdminModule'
    },
    {path: '', component: NosotrosComponent},
    {path: 'consultas', component: ConsultasComponent},
    {path: 'contactos', component: ContactosComponent},
    {path: 'login', component: LoginComponent},
    {path: '**', pathMatch: 'full', redirectTo: '' }
];
export const app_routing = RouterModule.forRoot(app_routes, {useHash: true});
