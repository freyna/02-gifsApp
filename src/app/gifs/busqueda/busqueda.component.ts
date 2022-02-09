import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  //Permite hacer referencia a un elemento en el HTML y obtener sus propiedades.
  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  constructor( private gifsService:GifsService){}

  buscar() {
    const valor = this.txtBuscar.nativeElement.value;

    this.gifsService.buscarGifs(valor);

    this.txtBuscar.nativeElement.value = '';

    console.log(this.gifsService.historial);
  }

}
