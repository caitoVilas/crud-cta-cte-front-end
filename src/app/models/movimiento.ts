import { stringify } from "@angular/compiler/src/util";

export class Movimiento {

    id: number;
    fecha: any;
    tipo: string;
    descripcion: string;
    importe: number;
    idcuenta: number;

    constructor(id: number, fecha: any, tipo: string, descripcion: string, importe: number, idcuenta: number) {

        this.id = id;
        this.fecha = fecha;
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.importe = importe;
        this.idcuenta = idcuenta;
    }
}
