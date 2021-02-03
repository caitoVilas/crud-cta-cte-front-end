export class ListCuentas {

    id: number;
   titular: string;
   rut: string;
   moneda: string;
   saldo:number;

   constructor(id: number, titular: string, rut: string, moneda: string, saldo: number){

    this.id = id;
    this.titular = titular;
    this.rut = rut;
    this.moneda = moneda;
    this.saldo = saldo;
   }
}