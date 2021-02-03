export class PersonaFisica {

    id: number;
    name: string;
    lastName: string;
    rut: string;

    constructor( nombre: string,  apellido: string, rut: string) {
        this.name = nombre;
        this.lastName = apellido;
        this.rut =rut;
    }
}
