import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

import { delay} from 'rxjs/operators';

import { HospitalService } from '../../../services/hospital.service';
import {Hospital} from '../../../models/hospital.model';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService} from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales:Hospital[]=[];
  public hospitalesTemp:Hospital[]=[];
  public cargando:boolean=true;

  public imgSubs?:Subscription;

  constructor( private hospitalService:HospitalService,
            private modalImagenServices:ModalImagenService,
            private buscarServices:BusquedasService,) 
  { }

  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSubs=this.modalImagenServices.nuevaImagen
    .pipe(delay(100))
    .subscribe(img=>this.cargarHospitales());
  }

  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }
  cargarHospitales(){

    this.cargando=true;
    this.hospitalService.cargarHospitales()
      .subscribe((resp:Hospital[])=>{
        this.hospitales=resp;
        this.hospitalesTemp=resp;
        this.cargando=false;
      })
  }
  guardarCambios(hospital:Hospital){

    this.hospitalService.actualizarHospital(hospital._id,hospital.nombre)
      .subscribe(resp=>{
        Swal.fire('Actualizado', 
        `El hospital ${hospital.nombre} se actualizó correctamente`,
        'success')
          
      })
  }
  eliminarHospital(hospital:Hospital){

    this.hospitalService.borrarHospital(hospital._id)
      .subscribe(resp=>{
        this.cargarHospitales();
        Swal.fire('Eliminado', 
        `El hospital ${hospital.nombre} se eliminó correctamente`,
        'success')
          
      })
  }
  async abrirSweetAlert(){
    const {value=''} = await Swal.fire<string>({
      title:'Crear hospital',
      text:'ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton:true
    })
    if(value!.trim().length>0 )
    {
      this.hospitalService.crearHospital(value)
       .subscribe(resp=>{
        this.hospitales.push(resp.msg)
       })
    }
  }
  abrirModal(hospital:Hospital){

    this.modalImagenServices.abrirModal('hospitales',hospital._id,hospital.img);
  }

  buscar(termino:string){

    if (termino.length===0){
      this.hospitales=this.hospitalesTemp;
      return 
    }

    this.buscarServices.buscar('hospitales',termino)
        .subscribe((resp:Hospital[]|any)=> 
          {
          this.hospitales=resp;
          })
  }
}
