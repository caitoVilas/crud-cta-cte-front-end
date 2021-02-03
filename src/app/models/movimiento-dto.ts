export class MovimientoDTO {

    fecha: any;
    tipo: string;
    descripcion: string;
    importe: number;
    idcuenta: number;

    constructor( fecha: any, tipo: string, descripcion: string, importe: number, idcuenta: number) {

        this.fecha = fecha;
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.importe = importe;
        this.idcuenta = idcuenta;
    }
}
