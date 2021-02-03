import { Component, OnInit } from '@angular/core';
import { PersonaFisica } from 'src/app/models/persona-fisica';
import { PersonasFisicasService } from 'src/app/services/personas-fisicas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-fiscas',
  templateUrl: './list-fiscas.component.html',
  styleUrls: ['./list-fiscas.component.css']
})
export class ListFiscasComponent implements OnInit {

// PAGINADOR
page = 0;
size = 10;
order = 'id';
asc = true;
isFirst = false;
isLast = false;
totalPages: Array<number> = [];

personasF: PersonaFisica[];

  constructor(
    private fisicasService: PersonasFisicasService
  ) { }

  ngOnInit(): void {
    this.getFisicas();
  }

  getFisicas() {
    this.fisicasService.list(this.page, this.size, this.order, this.asc).subscribe(
      response => {
        this.personasF = response.content;
       this.isFirst = response.first;
       this.isLast = response.last;
       this.totalPages = new Array(response['totalPages']);
      },
      err => {
        console.log(err);
      }
    );
  }

  delete(id: number){

    this.fisicasService.delete(id).subscribe(
      response => {
        Swal.fire(response.mensaje, '', 'success');
        this.getFisicas();
      },
      err => {
        Swal.fire(err.error.mensaje, 'No se puede Eliminar', 'error');
      }
    );
  }

  rewind(): void {
    if(!this.isFirst){
      this.page--;
      this.getFisicas();
    }
  }
  
  forward(): void {
    if(!this.isLast){
      this.page++;
      this.getFisicas();
    }
  }
  
  setPage(page: number): void {
    this.page  = page;
    this.getFisicas();
  }
  
}
