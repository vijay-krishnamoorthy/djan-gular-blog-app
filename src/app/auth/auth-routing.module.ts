import { Route, RouterModule, Routes } from "@angular/router";
import { AuthComponent } from './auth.component';
import { NoAuthGuard } from './no-auth-guard.service';
import { NgModule } from '@angular/core';




const routes: Routes = [
    {
        path: 'login',
        component: AuthComponent,
        canActivate: [NoAuthGuard]
    },
    {
        path: 'register',
        component: AuthComponent,
        canActivate: [NoAuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }