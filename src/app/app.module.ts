import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { TitularesComponent } from './components/titulares/titulares.component';
import { CuentasComponent } from './components/cuentas/cuentas.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListFiscasComponent } from './components/list-fiscas/list-fiscas.component';
import { ListJuridicasComponent } from './components/list-juridicas/list-juridicas.component';
import { AddFisicaComponent } from './components/add-fisica/add-fisica.component';
import { AddJuridicaComponent } from './components/add-juridica/add-juridica.component';
import { ListCuentasComponent } from './components/list-cuentas/list-cuentas.component';
import { AddCuentasComponent } from './components/add-cuentas/add-cuentas.component';
import { DetalleCuentaComponent } from './components/detalle-cuenta/detalle-cuenta.component';
import { AddDetalleComponent } from './components/add-detalle/add-detalle.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    TitularesComponent,
    CuentasComponent,
    ListFiscasComponent,
    ListJuridicasComponent,
    AddFisicaComponent,
    AddJuridicaComponent,
    ListCuentasComponent,
    AddCuentasComponent,
    DetalleCuentaComponent,
    AddDetalleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
