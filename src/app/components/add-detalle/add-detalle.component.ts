import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { MovimientoDTO } from 'src/app/models/movimiento-dto';
import { MovimientoService } from 'src/app/services/movimiento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-detalle',
  templateUrl: './add-detalle.component.html',
  styleUrls: ['./add-detalle.component.css']
})
export class AddDetalleComponent implements OnInit {

  idCuenta: number;
  _tipo: string;
  _descripcion: string;
  _importe: number;

  nuevoMovimiento: MovimientoDTO;
  formMov: FormGroup;

  constructor(
    private ruta: ActivatedRoute,
    private ruter: Router,
    public buildForm: FormBuilder,
    private movService: MovimientoService
  ) { }

  ngOnInit(): void {

    this.ruta.params.subscribe((p: Params) => {
      this.idCuenta = p.id;
    });
    this.movFrmBuild();
  }

  movFrmBuild(){

    this.formMov = this.buildForm.group({
      tipo: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      importe: new FormControl('', [Validators.required])
    })
    this.formMov.valueChanges
    .pipe(debounceTime(500))
    .subscribe(data => {
     if(this.formMov.valid){
       //TodoOK
       this._tipo = data.tipo;
       this._descripcion = data.descripcion;
       if(data.tipo == 'Debito')
       this._importe = Number(-data.importe);
     }
     if(data.tipo == 'Credito'){
      this._importe = Number(data.importe);
     }
     
    });
  }

  addMovimiento(){

    this.nuevoMovimiento = new MovimientoDTO(new Date(), this._tipo, this._descripcion, this._importe, this.idCuenta)

    this.movService.add(this.nuevoMovimiento).subscribe(
      response => {
          Swal.fire(response.mensaje, '', 'success');
          this.formMov.reset();
      },
      err => {
          Swal.fire(err.error.mensaje, 'El Movimiento No se Imputo', 'error');
      }
    );
  }

  volver(id: number){

    this.ruter.navigate(['/detalle/' + id])
  }

}
