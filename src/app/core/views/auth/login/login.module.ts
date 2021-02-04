import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginService } from './login.service';
import { LoginViewComponent } from './login.view';

@NgModule({
    declarations: [LoginViewComponent],
    imports: [
        LoginRoutingModule,
        SharedModule,
        CommonModule,
        ReactiveFormsModule,
         FormsModule],
    providers: [LoginService],
    entryComponents: []
})

export class LoginModule {
}
