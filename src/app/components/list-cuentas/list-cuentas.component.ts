import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Cuentas } from 'src/app/models/cuentas';
import { ListCuentas } from 'src/app/models/llist-cuentas';
import { CuentasService } from 'src/app/services/cuentas.service';
import { PersonasFisicasService } from 'src/app/services/personas-fisicas.service';
import { PersonasJuridicasService } from 'src/app/services/personas-juridicas.service';

@Component({
  selector: 'app-list-cuentas',
  templateUrl: './list-cuentas.component.html',
  styleUrls: ['./list-cuentas.component.css']
})
export class ListCuentasComponent implements OnInit {

  // PAGINADOR
page = 0;
size = 10;
order = 'id';
asc = true;
isFirst = false;
isLast = false;
totalPages: Array<number> = [];

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

    this.cuentasService.list(this.page, this.size, this.order, this.asc).subscribe(
      response => {
        this.cuentas = response.content;

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
          this.isFirst = response.first;
          this.isLast = response.last;
          this.totalPages = new Array(response['totalPages']);
        });
       
      },
      err => {
        console.log(err.error.mensaje);
      }
    );
  }

  rewind(): void {
    if(!this.isFirst){
      this.page--;
      this.getCuentas();
    }
  }
  
  forward(): void {
    if(!this.isLast){
      this.page++;
      this.getCuentas();
    }
  }
  
  setPage(page: number): void {
    this.page  = page;
    this.getCuentas();
  }

  navega(id: number) {

    this.route.navigate(['/detalle/' + id]);
  }
}
