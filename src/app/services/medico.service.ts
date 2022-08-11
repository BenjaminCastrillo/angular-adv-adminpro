import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators'


import { environment } from '../../environments/environment.prod';
import {Medico} from '../models/medico.model'

const base_url=environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http:HttpClient,) { }

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

  cargarMedicos(){

    return this.http.get<Medico[]>(`${base_url}/medicos`,this.headers)
        .pipe(
          map((resp:any)=>resp.medicos)
        )
            
      }

  obtenerMedicoById(id:string){
        return this.http.get<Medico[]>(`${base_url}/medicos/${id}`,this.headers)
            .pipe(
              map((resp:any)=>resp.medico)
        )
                
  }
    

  crearMedico(medico:{nombre:string,hospital:string}){

    return this.http.post<any>(`${base_url}/medicos`,medico,this.headers);
            
      }
  actualizarMedico(medico:Medico){

    return this.http.put<Medico[]>(`${base_url}/medicos/${medico._id}`,medico,this.headers);
            
      }
  borrarMedico(_id:String){

    return this.http.delete<Medico[]>(`${base_url}/medicos/${_id}`,this.headers);
            
      }


}
