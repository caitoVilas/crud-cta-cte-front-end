import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-titulares',
  templateUrl: './titulares.component.html',
  styleUrls: ['./titulares.component.css']
})
export class TitularesComponent implements OnInit {

  //FLAGS
  pfFlag = false;
  pjFlag = false;

  constructor() { }

  ngOnInit(): void {
  }

  getFisicas(){
    this.pfFlag = true;
    this.pjFlag = false;
  }

  getJuridicas() {
    this.pfFlag = false;
    this.pjFlag = true;
  }
}
