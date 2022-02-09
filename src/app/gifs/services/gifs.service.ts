import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/search.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[]=[];
  private api_key: string = 'AYY8JLaAxq9DsdFuuSXYFL1vm21xStJE';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  public resultados: Gif[] = [];

  constructor ( private http: HttpClient){

    // Permite recuperar datos guardados en la base local del explorador.
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  get historial(){

    // los arreglos se pasan por referencia es por eso que usamos el operador
    ///... para copiar a nuevo arreglo.
    return [...this._historial];

  }

  buscarGifs(query:string){
    
    query = query.trim().toLocaleLowerCase();

    if( query.length === 0 ) {
      return;
    }

    if(!this._historial.includes(query)) {

      this._historial.unshift(query);

      this._historial = this._historial.splice(0,10);

      //Guarda localmente el historial -- Application/storage/Local Storage
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
                  .set('api_key', this.api_key)
                  .set('q', query)
                  .set('limit', 10)

    const url = `${this.serviceUrl}/search`;

    this.http.get<SearchGifsResponse>(url,{params})
    .subscribe((result) =>{

      console.log(result.data);

      this.resultados = result.data;

      localStorage.setItem('resultados', JSON.stringify(this.resultados));

    });


  }
}
