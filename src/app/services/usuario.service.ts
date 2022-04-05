import { Injectable, NgZone } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment.prod';
import {RegisterForm} from '../interfaces/register-form';
import {LoginForm} from '../interfaces/login-form';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

const base_url=environment.base_url;

declare const gapi:any;


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
 
  public auth2:any;
  
  constructor( private http:HttpClient,
    private router:Router,
    private ngZone:NgZone) { 

      this.googleInit();
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

  validarToken():Observable<boolean>{

    const token= localStorage.getItem('tokenHopitales')||'';
    return this.http.get(`${base_url}/login/renew`,{
      headers:{
        'x-token':token
      }
    }).pipe(
        tap(
        {next:(resp:any)=>{
          localStorage.setItem('tokenHopitales',resp.token)
        }
      }),map(resp=>true),
      catchError(error=> of(false))
    );
  
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

    return this.http.post(`${base_url}/login`,formData).
        pipe(
          tap(
            {next:(resp:any)=>{
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
  logout(){
    localStorage.removeItem('tokenHopitales');
    this.auth2.signOut().then( ()=> {
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/login');
        console.log('User signed out.');
      })
    });
  }
}
