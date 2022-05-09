import { Injectable, NgZone } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment.prod';
import {RegisterForm} from '../interfaces/register-form';
import {LoginForm} from '../interfaces/login-form';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

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
      return localStorage.getItem('tokenHopitales')||'';
    }
    get uid():string{
      return this.usuario?.uid || '';
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
              localStorage.setItem('tokenHopitales',resp.token)
            }
          })
        );
  }

  login(formData:LoginForm){

    console.log('en el login',formData);
    return this.http.post(`${base_url}/login`,formData).
        pipe(
          tap(
            {next:(resp:any)=>{
              console.log('usuario de la clase 1',this.usuario);
              localStorage.setItem('tokenHopitales',resp.token)
            }
          })
        );
  }

  loginGoogle(token:any){

    return this.http.post(`${base_url}/login/google`,{token}).
        pipe(
          tap(
            {next:(resp:any)=>{
              localStorage.setItem('tokenHopitales',resp.token)
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

   return this.http.put(`${base_url}/usuarios/${this.uid}`,data,{
      headers:{
        'x-token':this.token
      }
    })
  } 

  validarToken():Observable<boolean>{


    console.log('en la funcion validarToken')

    return this.http.get(`${base_url}/login/renew`,{
      headers:{
        'x-token':this.token
      }
    }).pipe(
        map((resp:any)=>{
          const {email,google,nombre, role,img,uid}=resp.usuario;
          this.usuario = new Usuario(nombre,email,'',img,google,role,uid);
          localStorage.setItem('tokenHopitales',resp.token);
          return true;
        }),
      catchError(error=> of(false))
    );
  }

  // tap(
  //   {next:(resp:any)=>{
  //     const {email,google,nombre, role,img,uid}=resp.usuario;
  //     this.usuario = new Usuario(nombre,email,'',img,google,role,uid);
  //     localStorage.setItem('tokenHopitales',resp.token);
  //     return true;
  //   }
  // }),map(resp=>true),


  logout(){
    localStorage.removeItem('tokenHopitales');
    this.auth2.signOut().then( ()=> {
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/login');
      })
    });
  }
}
