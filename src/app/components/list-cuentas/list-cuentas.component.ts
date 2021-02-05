import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Cuentas } from 'src/app/models/cuentas';
import { ListCuentas } from 'src/app/models/llist-cuentas';
import { CuentasService } from 'src/app/services/cuentas.service';
import { PersonasFisicasService } from 'src/app/services/personas-fisicas.service';
import { PersonasJuridicasService } from 'src/app/services/personas-juridicas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-cuentas',
  templateUrl: './list-cuentas.component.html',
  styleUrls: ['./list-cuentas.component.css']
})
export class ListCuentasComponent implements OnInit {


cuentas: Cuentas[] = [];
listCuenta: ListCuentas;
listCuentas: ListCuentas[] = [];
public _nombre: string;
public _rut: string;

  constructor(
    private cuentasService: CuentasService,
    private pfService: PersonasFisicasService,
    private pjService: PersonasJuridicasService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.getCuentas();
  }

  getCuentas(){

    this.cuentasService.list().subscribe(
      response => {
        this.cuentas = response;

        this.cuentas.forEach(cuenta =>{
          if(cuenta.tipo == 'F'){

            this.pfService.get(cuenta.titular).subscribe(
              response => {
              this._nombre = response.name + ' ' + response.lastName;
               this._rut = response.rut;
               this.listCuenta = new ListCuentas(cuenta.id,this._nombre, this._rut, cuenta.moneda, cuenta.saldo );
               this.listCuentas.push(this.listCuenta);
              }
            );
          }
          if(cuenta.tipo == 'J'){
           
            this.pjService.get(cuenta.titular).subscribe(
              response => {
                this.listCuenta = new  ListCuentas(cuenta.id, response.razonSocial, response.rut, cuenta.moneda, cuenta.saldo);
                this.listCuentas.push(this.listCuenta);
              }
            );
          }
         
        });
       
      },
      err => {
        console.log(err.error.mensaje);
      }
    );
  }

  delete(id: number) {

    this.cuentasService.delete(id).subscribe(
      response => {
         Swal.fire(response.mensaje);
         this.getCuentas();
      },
      err => {
        Swal.fire(err.error.mensaje,'', 'error');
      }
    );
  }

  navega(id: number) {

    this.route.navigate(['/detalle/' + id]);
  }
}
