import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { CuentasDTO } from 'src/app/models/cuentas-dto';
import { PersonaFisica } from 'src/app/models/persona-fisica';
import { PersonaJuridica } from 'src/app/models/persona-juridica';
import { CuentasService } from 'src/app/services/cuentas.service';
import { PersonasFisicasService } from 'src/app/services/personas-fisicas.service';
import { PersonasJuridicasService } from 'src/app/services/personas-juridicas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-cuentas',
  templateUrl: './add-cuentas.component.html',
  styleUrls: ['./add-cuentas.component.css']
})
export class AddCuentasComponent implements OnInit {

  //FLAGS
  opTipo = true;
  opTitularF = false;
  opTitularJ = false;
  opMoneda = false;
  opGuardar = false;
// FORMULARIOS
  formTipo: FormGroup;
  formTitular: FormGroup;
  formMoneda: FormGroup;

  personasF: PersonaFisica[] = [];
  personasJ: PersonaJuridica[] = [];
  nuevaCuenta: CuentasDTO;
  saldo: number;
  moneda: string;
  titular: number;
  tipo: string;
  fullName: string;

  constructor(
   public  builderTipo: FormBuilder,
   public builderTitular: FormBuilder,
   private builderMoneda: FormBuilder,
   private pfService: PersonasFisicasService,
   private pjService: PersonasJuridicasService,
   private cuentasService: CuentasService
  ) { }

  ngOnInit(): void {
    this.FrmtipoBuilder();
    this.frmTitularBuilder();
    this.frmMonedaBuilder();
  }

  FrmtipoBuilder(){
 
    this.formTipo = this.builderTipo.group({
      tipo: new FormControl('', [Validators.required])
    })
    this.formTipo.valueChanges
    .pipe(debounceTime(500))
    .subscribe(data => {
      this.tipo = data.tipo;
      this.getTitulares();
      this.opTipo = false;
    });
  }

  frmTitularBuilder() {

    this.formTitular = this.builderTitular.group({
      titular: new FormControl('', [Validators.required])
    });
    this.formTitular.valueChanges
    .pipe(debounceTime(500))
    .subscribe(data => {
      if(this.formTitular.valid){
         this.titular = data.titular;
         this.getFullNombre();
         this.opMoneda = true;
         this.opTitularJ = false;
         this.opTitularF = false;
      }
    });
  }

  frmMonedaBuilder(){

    this.formMoneda = this.builderMoneda.group({
      moneda: new FormControl('', [Validators.required])
    })
    this.formMoneda.valueChanges
    .pipe(debounceTime(500))
    .subscribe(data => {
      this.moneda = data.moneda;
      this.opMoneda = false;
      this.opGuardar = true;
    });
    
  }

  getTitulares() {

   if(this.tipo == 'F') {
     this.opTitularF = true;
    this.pfService.listAll().subscribe(
      response => {
         this.personasF = response;
      }
    );
   }
   if(this.tipo == 'J'){
     this.opTitularJ = true;
     this.pjService.listAll().subscribe(
       response => {
         this.personasJ = response;
       }
     );
   }
  }

  getFullNombre(){

    if (this.tipo == 'F') {
      this.pfService.get(this.titular).subscribe(
        response => {
          this.fullName = response.name + ' ' + response.lastName + ' ' + response.rut;
        }
      );
    }
    if(this.tipo == 'J') {
      this.pjService.get(this.titular).subscribe(
        response => {
          this.fullName = response.razonSocial + ' ' + response.rut;
        }
      );
    }
  }

  save(){

    this.nuevaCuenta = new CuentasDTO(0, this.moneda, this.titular, this.tipo);

   this.cuentasService.add(this.nuevaCuenta).subscribe(
     response => {
        Swal.fire(response.mensaje, '', 'success');
        this.opTipo = true;
        this.opTitularF = false;
        this.opTitularJ =false;
        this.opMoneda = false;
        this.opGuardar = false;
        this.tipo = '';
        this.titular = null;
        this.moneda = '';
        this.fullName = '';

     },
     err => {
        Swal.fire(err.error.mensaje, '','error');
        this.opTipo = true;
        this.opTitularF = false;
        this.opTitularJ =false;
        this.opMoneda = false;
        this.opGuardar = false;
        this.tipo = '';
        this.titular = null;
        this.moneda = '';
        this.fullName = '';
     }
   );
  }

  }



