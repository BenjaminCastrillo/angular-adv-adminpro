import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { delay} from 'rxjs/operators';

import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';
import { CargarUsuario } from '../../../interfaces/cargar-usuario';
import { BusquedasService} from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public imgSubs?:Subscription;
  public usuarios:Usuario[]=[];
  public usuariosTemp:Usuario[]=[];

  public totalUsuarios:number=0;
  public desde:number=0;
  public cargando:boolean=true;

  constructor( private usuarioServices:UsuarioService,
                private buscarServices:BusquedasService,
                private modalImagenServices:ModalImagenService) { }
 
  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }
  ngOnInit(): void {

   this.cargarUsuarios()

  // nuevaImagen es una propiedad del tipo EventEmitter que se modifica en 
  // modal-imagen.ts cuando se cambia la imagen
   this.imgSubs=this.modalImagenServices.nuevaImagen
         .pipe(delay(100))
         .subscribe(img=>this.cargarUsuarios());
  }

  cargarUsuarios(){
    this.cargando=true;
    this.usuarioServices.cargarUsuarios(this.desde)
    .subscribe(({total,usuarios})=>{
      this.totalUsuarios=total;
      this.usuarios=usuarios;
      this.usuariosTemp=usuarios;
      this.cargando=false;
    })
    return;
  }

  cambiarPagina(valor:number){
    this.desde += valor;

    if (this.desde<0){
      this.desde=0;
    }else if( this.desde>=this.totalUsuarios){
      this.desde -=valor;
    }
    this.cargarUsuarios();
  }

  buscar(termino:string){

    if (termino.length===0){
      this.usuarios=this.usuariosTemp;
      return 
    }

    this.buscarServices.buscar('usuarios',termino)
        .subscribe((resp:Usuario[]|any)=> 
          {
           this.usuarios=resp;
          })
  }

  eliminarUsuario(usuario:Usuario){

    if(usuario.uid===this.usuarioServices.uid){
      Swal.fire('Intenta borrarse a si mismo', 
      `El usuario ${usuario.nombre} no se puede eliminar`,
      'error')
      return

    }
    Swal.fire({
      title: 'Borrar usuario?',
      text: `Esta a punto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioServices.eliminarUsuario(usuario).
        subscribe(resp=> {
          this.cargarUsuarios();
          Swal.fire('usuario eliminado', 
                  `${usuario.nombre} fue eliminado correctamente`,
                  'success')
        })
      }
    })
  }

  cambiarRole(usuario:Usuario){

    this.usuarioServices.guardarUsuario(usuario).
      subscribe(resp=>{
      })

  }
  abrirModal(usuario:Usuario){

    this.modalImagenServices.abrirModal('usuarios',usuario.uid,usuario.img);

  }
}


