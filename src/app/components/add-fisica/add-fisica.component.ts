import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


import { debounceTime } from 'rxjs/operators'
import { PersonafisicaDTO } from 'src/app/models/personafisica-dto';
import { PersonasFisicasService } from 'src/app/services/personas-fisicas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-fisica',
  templateUrl: './add-fisica.component.html',
  styleUrls: ['./add-fisica.component.css']
})
export class AddFisicaComponent implements OnInit {

  frmFiscas: FormGroup;

  personaF: PersonafisicaDTO;

  constructor(
    private  builderForm: FormBuilder,
    private fisicaService: PersonasFisicasService
  ) { }

  ngOnInit(): void {
    this.builderF();
  }

  builderF() {
    this.frmFiscas = this.builderForm.group({
      name: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      rut: new FormControl('', [Validators.required])
    });
    this.frmFiscas.valueChanges
    .pipe(debounceTime(500))
    .subscribe(data => {
     if(this.frmFiscas.valid) {
       this.personaF = new PersonafisicaDTO(data.name, data.lastName, data.rut);
     }
    });
  }

  saveF() {
   
    console.log(this.personaF);
    this.fisicaService.add(this.personaF).subscribe(
      response => {
        Swal.fire(response.mensaje, '', 'success');
        this.frmFiscas.reset();
      },
      err => {
       Swal.fire(err.error.mensaje,'','error');
      }
    );
  }
}
