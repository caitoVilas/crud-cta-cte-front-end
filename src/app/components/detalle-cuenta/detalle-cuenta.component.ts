import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params} from '@angular/router'
import { CuentasService } from 'src/app/services/cuentas.service';
import { Cuentas } from 'src/app/models/cuentas';
import { PersonasFisicasService } from 'src/app/services/personas-fisicas.service'
import { PersonasJuridicasService } from 'src/app/services/personas-juridicas.service';
import { Movimiento } from 'src/app/models/movimiento';
import { MovimientoService } from 'src/app/services/movimiento.service';

const TOPE_PESO = 1000;
const TOPE_DOLAR = 300;
const TOPE_EURO = 150;

@Component({
  selector: 'app-detalle-cuenta',
  templateUrl: './detalle-cuenta.component.html',
  styleUrls: ['./detalle-cuenta.component.css']
})
export class DetalleCuentaComponent implements OnInit {

  idCuenta: number;
  cuenta: Cuentas;
  titular: any;
  titFisica = false;
  titJurida = false;
  signoMoneda: string;
  disponible: number;
  movimientos: Movimiento[] = [];

// PAGINADOR
page = 0;
size = 10;
order = 'id';
asc = false;
isFirst = false;
isLast = false;
totalPages: Array<number> = [];



  constructor(
    private ruta: ActivatedRoute,
    private ctaService: CuentasService,
    private pfService: PersonasFisicasService,
    private pjService: PersonasJuridicasService,
    private movService: MovimientoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // RECOGEMOS EL PARAMETRO DE LA RUTA
    this.ruta.params.subscribe( (p: Params) => {   
       this.idCuenta = p.id
    });

    this.getCuenta();
    this.getMovimiento();
  }

  getCuenta() {

    this.ctaService.get(this.idCuenta).subscribe(
      response => {
        this.cuenta = response;
        if(this.cuenta.moneda == 'Euro'){
          this.signoMoneda = '€';
          if(this.cuenta.saldo < 0){
            this.disponible = TOPE_EURO - (-this.cuenta.saldo);
          }
          else{
            this.disponible = TOPE_EURO;
          }
        }else if(this.cuenta.moneda == 'Dolar'){
          this.signoMoneda = 'u$d';
          if(this.cuenta.saldo < 0) {
            this.disponible = TOPE_DOLAR - (-this.cuenta.saldo);
          }else{
            this.disponible = TOPE_DOLAR;
          }
        }else{
          this.signoMoneda = '$';
          if(this.cuenta.saldo < 0){
            this.disponible = TOPE_PESO -(-this.cuenta.saldo);
          }else{
            this.disponible = TOPE_PESO;
          }
        }
        this.getTitular();
      }
    );
  }

  getTitular() {

    if(this.cuenta.tipo == 'F'){

      this.pfService.get(this.cuenta.titular).subscribe(
        response => {
          this.titular = response;
          this.titFisica = true;
          this.titJurida = false;
        }
      );
    }
    if(this.cuenta.tipo == 'J'){

      this.pjService.get(this.cuenta.titular).subscribe(
        response => {
          this.titular = response;
         this.titFisica = false;
         this.titJurida = true;
        }
      );
    }
  }

  getMovimiento(){

    this.movService.list(this.idCuenta, this.page,this.size,this.order,this.asc).subscribe(
      response => {
        this.movimientos = response.content;
        this.isFirst = response.first;
        this.isLast = response.last;
        this.totalPages = new Array(response['totalPages']);
        console.log(this.movimientos);
      },
      err => {
        console.log(err);
      }
    );
  }

  rewind(): void {
    if(!this.isFirst){
      this.page--;
      this.getMovimiento();
    }
  }
  
  forward(): void {
    if(!this.isLast){
      this.page++;
      this.getMovimiento();
    }
  }
  
  setPage(page: number): void {
    this.page  = page;
    this.getMovimiento();
  }

  loadAddDetalle(id: number){

      this.router.navigate(['/add-detalle/' +id]);
  }
}
