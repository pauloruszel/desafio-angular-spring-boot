import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './modules/public/components/login/login.component';
import {HomeComponent} from './modules/private/components/home/home.component';
import {ProfileComponent} from './modules/private/components/profile/profile.component';
import {BoardAdminComponent} from './modules/private/components/board-admin/board-admin.component';
import {BoardModeratorComponent} from './modules/private/components/board-moderator/board-moderator.component';
import {BoardUserComponent} from './modules/private/components/board-user/board-user.component';
import {RegisterComponent} from './modules/public/components/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {authInterceptorProviders} from './modules/core/services/auth-interceptor.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {RouterModule} from '@angular/router';
import {SharedModelsModule} from './shared/shared-models/shared-models.module';
import {AppRoutingModule} from './app-routing.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatPaginatorModule} from "@angular/material/paginator";
import {CadastrarComponent} from './modules/private/components/cliente/cadastrar/cadastrar.component';
import {EditarComponent} from './modules/private/components/cliente/editar/editar.component';
import {PesquisarComponent} from './modules/private/components/cliente/pesquisar/pesquisar.component';
import {VisualizarComponent} from './modules/private/components/cliente/visualizar/visualizar.component';
import {MatTableModule} from "@angular/material/table";
import {SharedComponentsModule} from "./shared/shared-components/shared-components.module";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    RegisterComponent,
    CadastrarComponent,
    EditarComponent,
    PesquisarComponent,
    VisualizarComponent,
  ],
    imports: [
        AppRoutingModule,
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatNativeDateModule,
        MatSelectModule,
        RouterModule,
        MatSnackBarModule,
        SharedModelsModule,
        MatTooltipModule,
        MatPaginatorModule,
        MatTableModule,
        SharedComponentsModule
    ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
