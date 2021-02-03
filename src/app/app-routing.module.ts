import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCuentasComponent } from './components/add-cuentas/add-cuentas.component';
import { AddDetalleComponent } from './components/add-detalle/add-detalle.component';
import { AddFisicaComponent } from './components/add-fisica/add-fisica.component';
import { AddJuridicaComponent } from './components/add-juridica/add-juridica.component';
import { CuentasComponent } from './components/cuentas/cuentas.component';
import { DetalleCuentaComponent } from './components/detalle-cuenta/detalle-cuenta.component';
import { HomeComponent } from './components/home/home.component';
import { TitularesComponent } from './components/titulares/titulares.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: '', redirectTo: '', pathMatch: 'full'},
  {path: 'titulares', component: TitularesComponent},
  {path: 'cuentas', component: CuentasComponent},
  {path: 'add-fisicas', component: AddFisicaComponent},
  {path: 'add-juridicas', component: AddJuridicaComponent},
  {path: 'add-cuenta', component: AddCuentasComponent},
  {path: 'detalle/:id', component: DetalleCuentaComponent},
  {path: 'add-detalle/:id', component: AddDetalleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
