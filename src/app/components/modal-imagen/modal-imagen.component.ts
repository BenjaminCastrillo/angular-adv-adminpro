import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenSubida!:File;
  public imagenTemp:string|ArrayBuffer|null=null;

  constructor(public modalImagenService:ModalImagenService,
    private fileUploadService:FileUploadService) { }

  ngOnInit(): void {
  }

 
  cerrarModal(){
    this.imagenTemp=null;
    this.modalImagenService.cerrarModal();
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

    const id= this.modalImagenService.id;
    const tipo= this.modalImagenService.tipo;
      
    this.fileUploadService
    .actualizarFoto(this.imagenSubida,tipo,id)
    .then(img=>{
      Swal.fire('Imagen guardada','Imagen actualizada con éxito','success');
      this.modalImagenService.nuevaImagen.emit(img)
      this.cerrarModal();
      }).catch(err=>{
        Swal.fire('Error',err.error.msg,'error');
      })
}
}
