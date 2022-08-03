import { environment } from '../../environments/environment.prod';

const base_Url=environment.base_url;

export class Usuario{


  constructor(
    public nombre: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role?: string,
    public uid?: string,
    )
    {}

    get imagenUrl(){

      if (!this.img){
        return `${base_Url}/upload/usuarios/no-image`;
      }
      // para los casos del usuario de google.
      if (this.img?.includes('https')){ 
          return this.img;
      }

      if (this.img){
        return `${base_Url}/upload/usuarios/${this.img}`;
      }else{
        return `${base_Url}/upload/usuarios/no-image`;
      }


    }

}