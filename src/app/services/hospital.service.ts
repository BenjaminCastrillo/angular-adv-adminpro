import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators'

import { environment } from '../../environments/environment.prod';
import {Hospital} from '../models/hospital.model'

const base_url=environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http:HttpClient,

  ) { }

  get token():string{
    return localStorage.getItem('tokenHospitales')||'';
  }

  get headers(){
    return {
      headers:{
        'x-token':this.token
      }
    }
  }

  cargarHospitales(){

    return this.http.get<Hospital[]>(`${base_url}/hospitales`,this.headers)
        .pipe(
          map((resp:any)=>resp.hospitales)
        )
            
      }
  crearHospital(nombre:string|undefined){

    return this.http.post<any>(`${base_url}/hospitales`,{nombre},this.headers);
            
      }
  actualizarHospital(_id:string,nombre:string){

    return this.http.put<Hospital[]>(`${base_url}/hospitales/${_id}`,{nombre},this.headers);
            
      }
  borrarHospital(_id:String){

    return this.http.delete<Hospital[]>(`${base_url}/hospitales/${_id}`,this.headers);
            
      }

}
