import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthViewComponent } from './auth.view';

const authRouter: Routes = [
    {
        path: '', component: AuthViewComponent, children: [
            { path: '', pathMatch: 'full', redirectTo: 'main' },
            {
                path: 'main',
                loadChildren: () => import('./auth-main/auth-main.module').then(m => m.AuthMainModule),
            },
            {
                path: 'login',
                loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
            },
            {
                path: 'registration',
                loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule),
            },
            {
                path:'forgot-password',
                loadChildren:() =>import('./forgot-password/forgot-password.module').then(m=>m.ForgotPasswordModule),
            },
        ]
    }
]
    ;

@NgModule({
    imports: [RouterModule.forChild(authRouter)],
    exports: [RouterModule]
})

export class AuthRoutingModule { }
