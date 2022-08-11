import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment.prod';
import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  base_url=environment.base_url;

  constructor(private http:HttpClient) { }


  get token():string{
    return localStorage.getItem('tokenHopitales')||'';
  }

  get headers(){
    return {
      headers:{
        'x-token':this.token
      }
    }
  }

  private transformarUsuarios(resultados:any[]):Usuario[]{

    return resultados.map( user=>
      new Usuario(user.nombre,user.email,'',user.img,user.google,user.role,user.uid))
  }

  private transformarHospitales(resultados:any[]):Hospital[]{

    return resultados;
  }
  private transformarMedicos(resultados:any[]):Medico[]{

    return resultados;
  }

  buscar(tipo:"hospitales"|"medicos"|"usuarios",termino:string){

    return this.http.get<any[]>(`${this.base_url}/todo/coleccion/${tipo}/${termino}`,this.headers)
            .pipe(
              map((resp:any)=> {
                switch(tipo)
                {
                  case 'usuarios':
                    return this.transformarUsuarios(resp.Resultado)
                    break;
                  case 'hospitales':
                    return this.transformarHospitales(resp.Resultado)
                    break;
                  case 'medicos':
                    return this.transformarMedicos(resp.Resultado)
                    break;
                  default:
                    return [];
                }
              })
            )
  }



}
