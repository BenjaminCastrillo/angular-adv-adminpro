import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Subscription } from 'rxjs';
import { Usuario } from '../../models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm!:FormGroup;
  public usuario:Usuario | undefined;
  public imagenSubida!:File;
  public imagenTemp:string|ArrayBuffer|null=null;

  constructor(private fb:FormBuilder,
              private usuarioService:UsuarioService,
              private fileUploadService:FileUploadService) {

      this.usuario=usuarioService.usuario;
  }
  ngOnInit(): void {
    
    this.perfilForm=this.fb.group({
      nombre:[this.usuario!.nombre, Validators.required],
      email:[this.usuario!.email, [Validators.required, Validators.email]],
    });
  }

  actualizarPerfil(){

    this.usuarioService.actualizarPerfil(this.perfilForm.value)
    .subscribe({next:(resp)=>{
      const {nombre,email}=this.perfilForm.value;
      this.usuario!.nombre=nombre;
      this.usuario!.email=email;
      console.log(resp);

      swal.fire('Datos guardados','Perfil modificado éxito','success');

    },error: (err)=>{
      swal.fire('Error',err.error.msg,'error')
    }
  }) 
  }

  cambiarImage(event:any){
     console.log(event.target.files[0]);
     this.imagenSubida=event.target.files[0];
    
     if(!this.imagenSubida){

       return this.imagenTemp=null;
     } 

     const reader= new FileReader();
      reader.readAsDataURL(this.imagenSubida);

     reader.onloadend=()=>{
       this.imagenTemp=reader.result;
     }
     
     return 
     
     
    }
    
    subirImagen(){
      
      this.fileUploadService
      .actualizarFoto(this.imagenSubida,'usuarios',this.usuario!.uid)
      .then(img=>{
        this.usuario!.img=img;
        swal.fire('Imagen guardada','Imagen actualizada con éxito','success');
        }).catch(err=>{
          swal.fire('Error',err.error.msg,'error');
        })
  }
}
