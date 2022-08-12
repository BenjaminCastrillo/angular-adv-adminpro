import { Injectable, NgZone } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment.prod';
import {RegisterForm} from '../interfaces/register-form';
import {LoginForm} from '../interfaces/login-form';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuario';
import { ReturnStatement } from '@angular/compiler';

const base_url=environment.base_url;

declare const gapi:any;


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
 
  public auth2:any;
  public usuario:Usuario | undefined;
  
  constructor( private http:HttpClient,
    private router:Router,
    private ngZone:NgZone) { 

      this.googleInit();
    }

    get token():string{
      return localStorage.getItem('tokenHospitales')||'';
    }
    get uid():string{
      return this.usuario?.uid || '';
    }

    get role():string|undefined{

      return this.usuario?.role;
    }
    get headers(){
      return {
        headers:{
          'x-token':this.token
        }
      }
    }

  googleInit(){

    return new Promise<void>(resolve=>{
      
      gapi.load('auth2', ()=>{
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '841560434906-8cpvplujpcp0c1m6lpn30s2hhsbctuv8.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          // Request scopes in addition to 'profile' and 'email'
          //scope: 'additional_scope'
        });
        resolve();
      });
    })
  }



  crearUsuario(formData:RegisterForm){

    return this.http.post(`${base_url}/usuarios`,formData).
        pipe(
          tap(
            {next:(resp:any)=>{
              this.guardarLocalStorage(resp.token,resp.menu);

            }
          })
        );
  }

  login(formData:LoginForm){
    console.log('llamo al servicio de login del servidor');

    return this.http.post(`${base_url}/login`,formData).
        pipe(
          tap(
            {next:(resp:any)=>{
              this.guardarLocalStorage(resp.token,resp.menu);
            }
          })
        );
  }

  loginGoogle(token:any){

    return this.http.post(`${base_url}/login/google`,{token}).
        pipe(
          tap(
            {next:(resp:any)=>{
              this.guardarLocalStorage(resp.token,resp.menu);

            }
          })
        );
  }

  actualizarPerfil(data:{nombre:string,email:string,role?:string|undefined}){

    data={
      ...data,
      role :this.usuario?.role
    };

   // this.usuario!.nombre=data.nombre;

   return this.http.put(`${base_url}/usuarios/${this.uid}`,data,this.headers)
  } 

  validarToken():Observable<boolean>{


    return this.http.get(`${base_url}/login/renew`,{
      headers:{
        'x-token':this.token
      }
    }).pipe(
        map((resp:any)=>{
          const {email,google,nombre, role,img,uid}=resp.usuario;
          this.usuario = new Usuario(nombre,email,'',img,google,role,uid);
          this.guardarLocalStorage(resp.token,resp.menu);

          return true;
        }),
      catchError(error=> of(false))
    );
  }

  // tap(
  //   {next:(resp:any)=>{
  //     const {email,google,nombre, role,img,uid}=resp.usuario;
  //     this.usuario = new Usuario(nombre,email,'',img,google,role,uid);
  //     localStorage.setItem('tokenHospitales',resp.token);
  //     return true;
  //   }
  // }),map(resp=>true),


  logout(){
    localStorage.removeItem('tokenHospitales');
    localStorage.removeItem('menuHospitales');
    this.auth2.signOut().then( ()=> {
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/login');
      })
    });
  }

  cargarUsuarios(desde:number=0){

return this.http.get<CargarUsuario>(`${base_url}/usuarios?desde=${desde}`,this.headers)
        .pipe(
          map(resp=>{
            const usuarios=resp.usuarios.map(user=>
                new Usuario(user.nombre,user.email,'',user.img,user.google,user.role,user.uid)
            )
            return {
              total:resp.total,
              usuarios
            };
          })
        )
  }

  eliminarUsuario(usuario:Usuario){
  
    return this.http.delete(`${base_url}/usuarios/${usuario.uid}`,this.headers)
  }

  guardarUsuario(usuario:Usuario){

   return this.http.put(`${base_url}/usuarios/${usuario.uid}`,usuario,this.headers)
  } 

  guardarLocalStorage(token:string,menu:any){
    localStorage.setItem('tokenHospitales',token);
    localStorage.setItem('menuHospitales',JSON.stringify(menu));
    return;
  }
}
