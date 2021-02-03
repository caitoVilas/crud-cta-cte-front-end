import { Component, OnInit } from '@angular/core';
import { report } from 'process';
import { PersonaJuridica } from 'src/app/models/persona-juridica';
import { PersonasJuridicasService } from 'src/app/services/personas-juridicas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-juridicas',
  templateUrl: './list-juridicas.component.html',
  styleUrls: ['./list-juridicas.component.css']
})
export class ListJuridicasComponent implements OnInit {

  
// PAGINADOR
page = 0;
size = 10;
order = 'id';
asc = true;
isFirst = false;
isLast = false;
totalPages: Array<number> = [];

personasJ : PersonaJuridica[] = [];

  constructor(
    private juridicasService: PersonasJuridicasService
  ) { }

  ngOnInit(): void {
    this.getJuridicas();
  }

  getJuridicas(){

    this.juridicasService.list(this.page, this.size, this.order, this.asc).subscribe(
      response => {
        this.personasJ = response.content;
        this.isFirst = response.first;
        this.isLast = response.last;
        this.totalPages = new Array(response['totalPages']);
      },
      err => {
        console.log(err);
      }
    );
  }

  delete(id: number) {

    this.juridicasService.delete(id).subscribe(
      response => {
          Swal.fire(response.mensaje, '', 'success');
          this.getJuridicas();
      },
      err => {
        Swal.fire(err.error.mensaje, 'No se puede Eliminar', 'error');
      }
    );
  }

  rewind(): void {
    if(!this.isFirst){
      this.page--;
      this.getJuridicas();
    }
  }
  
  forward(): void {
    if(!this.isLast){
      this.page++;
      this.getJuridicas();
    }
  }
  
  setPage(page: number): void {
    this.page  = page;
    this.getJuridicas();
  }

}
