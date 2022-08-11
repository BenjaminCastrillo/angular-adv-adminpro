import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

import { delay} from 'rxjs/operators';

import { MedicoService } from '../../../services/medico.service';
import {Medico} from '../../../models/medico.model';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService} from '../../../services/busquedas.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit,OnDestroy {

  public medicos:Medico[]=[];
  public medicosTemp:Medico[]=[];
  public cargando:boolean=true;

  public imgSubs?:Subscription;
  constructor(private medicoService:MedicoService,
    private modalImagenServices:ModalImagenService,
    private buscarServices:BusquedasService,) 
  { }

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs=this.modalImagenServices.nuevaImagen
    .pipe(delay(100))
    .subscribe(img=>{
      this.cargarMedicos() 
    }
      );
  }

  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }

  cargarMedicos(){

    this.cargando=true;
    this.medicoService.cargarMedicos()
      .subscribe((resp:Medico[])=>{
        this.medicos=resp;
        this.medicosTemp=resp;
        this.cargando=false;
      })
  }

  abrirModal(medico:Medico){

    this.modalImagenServices.abrirModal('medicos',medico._id,medico.img);
  }

  buscar(termino:string){

    if (termino.length===0){
      this.medicos=this.medicosTemp;
      return 
    }

    this.buscarServices.buscar('medicos',termino)
        .subscribe((resp:Medico[]|any)=> 
          {
          this.medicos=resp;
          })
  }
  eliminarMedico(medico:Medico){

    Swal.fire({
      title: 'Borrar médico?',
      text: `Esta a punto de borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.borrarMedico(medico._id)
        .subscribe(resp=>{
          this.cargarMedicos();
          Swal.fire('Eliminado', 
          `El medico ${medico.nombre} se eliminó correctamente`,
          'success')
            
        })
      }
    })



   
  }
}
