import {RouterModule, Routes} from '@angular/router';

const app_routes: Routes = [
    {
      path: '',
      loadChildren: './cliente/cliente.module#ClienteModule'
    },
    {
      path: 'admin',
      loadChildren: './admin/admin.module#AdminModule'
    },
    {path: '**', pathMatch: 'full', redirectTo: '' }
];
export const app_routing = RouterModule.forRoot(app_routes, {useHash: true});
