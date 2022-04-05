import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'
  ]
})
export class RegisterComponent implements OnInit {

  public formSubmitted:boolean=false;

  public registerForm= this.fb.group({
    nombre:['Benjamin',[Validators.required, Validators.minLength(3)]],
    email:['benjamin.castrillo@gmail.com',[Validators.required, Validators.email]],
    password:['123456',[Validators.required]],
    password2:['123456',[Validators.required]],
    terminos:[false,[Validators.required]],
  },{
    validators:this.passwordsIguales('password','password2')
  });

  constructor(
    private fb:FormBuilder,
    private usuarioService:UsuarioService,
    private router:Router) { }

  ngOnInit(): void {
  }

  crearUsuario(){
    this.formSubmitted=true;
    console.log(this.registerForm.value);
    if (this.registerForm.invalid){
      return
    }
  
    this.usuarioService.crearUsuario(this.registerForm.value).
        subscribe({next:(resp)=>{
          console.log('usuario creado',resp);
         //navegar al dashboard
        this.router.navigateByUrl('/');
        },error: (error)=>
          swal.fire('Error',error.error.msg,'error')
        })

  }

  campoNoValido(campo:string):boolean{

    if (this.registerForm.get(campo)?.invalid && this.formSubmitted){
      return true;
    }else{
      return  false;
    }

  }
  contrasenaNoValida(){
    const pass1:string=this.registerForm.get('password')?.value;
    const pass2:string=this.registerForm.get('password2')?.value;

  if(pass1!==pass2 && this.formSubmitted){
    return true;
  }else{
    return false;
  }

  }

  aceptaTerminos(){

    return !this.registerForm.get('terminos')?.value && this.formSubmitted
  }

  passwordsIguales(pass1:string,pass2:string){

    return (formGroup:FormGroup)=>{

      const pass1Controls=formGroup.get(pass1);
      const pass2Controls=formGroup.get(pass2);

  
      if (pass1Controls?.value===pass2Controls?.value){
        pass2Controls?.setErrors(null);

      }else{
        pass2Controls?.setErrors({noEsIgual:true});
      }
    }
  }
}