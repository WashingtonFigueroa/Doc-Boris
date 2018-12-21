import {RouterModule, Routes} from '@angular/router';
import {NosotrosComponent, ConsultasComponent, ContactosComponent} from './components/rutas';

const app_routes: Routes = [
    {path: '', component: NosotrosComponent},
    {path: 'consultas', component: ConsultasComponent},
    {path: 'contactos', component: ContactosComponent},
    {path: '**', pathMatch: 'full', redirectTo: '' }
];
export const app_routing = RouterModule.forRoot(app_routes, {useHash: true});
