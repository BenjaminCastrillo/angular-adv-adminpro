import { IfStmt } from '@angular/compiler';
import { Injectable, EventEmitter } from '@angular/core';

import { environment } from '../../environments/environment.prod';

const base_url=environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal:boolean=true;
  public tipo:'usuarios'|'medicos'|'hospitales'='usuarios';
  public id:string|undefined='';
  public img:string='';

  public nuevaImagen:EventEmitter<string> =new EventEmitter<string>();

  get ocultarModal(){
    return this._ocultarModal;
  }

  abrirModal(tipo:'usuarios'|'medicos'|'hospitales',
            id:string|undefined,
            img:string='no-img'){

    this._ocultarModal=false;

    this.tipo=tipo;
    this.id=id;
    
    if (img.includes('https')){
      
      this.img=img
    }else{
      this.img=`${base_url}/upload/${tipo}/${img}`;
    }

  }
  cerrarModal(){

    this._ocultarModal=true;
  }

  constructor() { }
}
