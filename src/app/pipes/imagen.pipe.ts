import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment.prod';

const base_Url=environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string|undefined, tipo: "usuarios"|"medicos"|"hospitales"):string {

    console.log(img);
    if (!img){
      return `${base_Url}/upload/usuarios/no-image`;
    }
    // para los casos del usuario de google.
    if (img?.includes('https')){ 
        return img;
    }

    if (img){
      return `${base_Url}/upload/${tipo}/${img}`;
    }else{
      return `${base_Url}/upload/usuarios/no-image`;
    }

  }

}
