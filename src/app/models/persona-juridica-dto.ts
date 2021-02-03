export class PersonaJuridicaDTO {

    razonSocial: string;
    foundation: string;
    rut: string;

    constructor(razonSocial: string, foundation: string, rut: string) {

        this.razonSocial = razonSocial;
        this.foundation = foundation;
        this.rut = rut;
    }
}
