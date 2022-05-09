import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'
  ]
})
export class LoginComponent implements OnInit {

  public loginForm= this.fb.group({
    email:[localStorage.getItem('emailHospitales') ||'',[Validators.required, Validators.email]],
    password:['',[Validators.required]],
    remember:[localStorage.getItem('rememberHospitales') || false]
  });

  public auth2:any;

  constructor(private router:Router,
              private fb:FormBuilder,
              private usuarioService:UsuarioService,
              private ngZone:NgZone) { }

  ngOnInit(): void {
    this.renderButton();
  }

  login(){
  console.log('loginForm',this.loginForm.value);

  if (this.loginForm.invalid){
    return
  }

  this.usuarioService.login(this.loginForm.value).
      subscribe({next:(resp)=>{

        if (this.loginForm.get('remember')?.value){
            localStorage.setItem('emailHospitales',this.loginForm.get('email')?.value)
            localStorage.setItem('rememberHospitales',this.loginForm.get('remember')?.value)
        }else{
          localStorage.removeItem('emailHospitales')
          localStorage.removeItem('rememberHospitales')
        }
        //navegar al dashboard
        this.router.navigateByUrl('/');

      },error: (error)=>
        swal.fire('Error',error.error.msg,'error')
      })

   


    // this.router.navigateByUrl('/');
  }

  //  onSuccess(googleUser:any) {
  //   console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
  //   var id_token = googleUser.getAuthResponse().id_token;
  //   console.log(id_token);
  // }

  // onFailure(error:any) {
  //   console.log(error);
  // }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });
    this.startApp();
  }

  async startApp () {

    await this.usuarioService.googleInit();
    this.auth2=this.usuarioService.auth2;

    this.attachSignin(document.getElementById('my-signin2'));
  
  }
  
  attachSignin(element:any) {
    this.auth2.attachClickHandler(element, {},
        (googleUser:any)=> {
          const id_token = googleUser.getAuthResponse().id_token;
          this.usuarioService.loginGoogle(id_token)
          .subscribe(resp=>{

            this.ngZone.run(()=>{
            //navegar al dashboard
            this.router.navigateByUrl('/');
            });
          });

        }, (error:any)=> {
          alert(JSON.stringify(error, undefined, 2));
        });
  }
}
