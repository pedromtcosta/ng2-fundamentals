import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { userRoutes } from './user.routes';

import { LoginComponent } from './login.component';
import { ProfileComponent } from './profile.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(userRoutes),
    ],
    declarations: [
        ProfileComponent,
        LoginComponent,
    ],
    providers: [
        
    ],
})
export class UserModule {

}
