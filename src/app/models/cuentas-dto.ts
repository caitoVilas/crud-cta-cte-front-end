export class CuentasDTO {

    saldo: number;
    moneda: string;
    titular: number;
    tipo: string;

    constructor(saldo: number, moneda: string, titular: number, tipo: string){

        this.saldo = saldo;
        this.moneda = moneda;
        this.titular = titular;
        this.tipo = tipo;
    }
}
