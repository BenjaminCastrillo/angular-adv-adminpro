import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment.prod';

const base_url=environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {


  constructor() { }

  async actualizarFoto(
    archivo:File,
    tipo:'usuarios'|'medicos'|'hospitales',
    id:string|undefined
  ){
    try{
      const url=`${base_url}/upload/${tipo}/${id}`;
      const formData= new FormData();
      formData.append('imagen',archivo);

      const resp= await fetch(url,{
        method:'PUT',
        headers: {
          'x-token':localStorage.getItem('tokenHospitales')||''
        },
        body:formData});

        const data= await resp.json();

        if (data.ok){
          return data.nombre
        }else{
          return false
        }
    }catch(err){
      return false
    }

  }
}
