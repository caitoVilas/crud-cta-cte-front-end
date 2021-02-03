import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { debounceTime } from 'rxjs/operators';
import { PersonaJuridicaDTO } from 'src/app/models/persona-juridica-dto';
import { PersonasJuridicasService } from 'src/app/services/personas-juridicas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-juridica',
  templateUrl: './add-juridica.component.html',
  styleUrls: ['./add-juridica.component.css']
})
export class AddJuridicaComponent implements OnInit {

  frmJuridica: FormGroup;
  personaJ: PersonaJuridicaDTO;

  constructor(
    private buildJuridica: FormBuilder,
    private juridicaService: PersonasJuridicasService
  ) { }

  ngOnInit(): void {
    this.builderJ();
  }

  builderJ(){
    this.frmJuridica = this.buildJuridica.group({
      razonSocial: new FormControl('', [Validators.required]),
      foundation: new FormControl('', [Validators.required]),
      rut: new FormControl('', [Validators.required])
    });
    this.frmJuridica.valueChanges
    .pipe(debounceTime(500))
    .subscribe(data => {
      if(this.frmJuridica.valid){
        this.personaJ = new PersonaJuridicaDTO(data.razonSocial, data.foundation, data.rut);
      }
    });
  }

  saveJ() {
   
    this.juridicaService.add(this.personaJ).subscribe(
      response => {
       Swal.fire(response.mensaje, '', 'success');
       this.frmJuridica.reset();
      },
      err => {
       Swal.fire(err.error.mensaje, '', 'error');
      }
    );
   
  }
}
