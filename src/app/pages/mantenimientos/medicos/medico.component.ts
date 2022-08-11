import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import {delay} from 'rxjs';

import { HospitalService } from '../../../services/hospital.service';
import {Hospital} from '../../../models/hospital.model';
import {Medico} from '../../../models/medico.model';
import { MedicoService } from '../../../services/medico.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm!:FormGroup;
  public hospitales:Hospital[]=[];
  public hospitalSeleccionado:Hospital|undefined;
  public medicoSeleccionado:Medico|undefined;
  
  constructor(private fb:FormBuilder,
              private hospitalService:HospitalService,
              private MedicoService:MedicoService,
              private router:Router,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {

    this.cargarHospitales();

    this.activatedRoute.params.subscribe(({id})=>
      {
        this.cargarMedico(id);
      })
      this.medicoForm=this.fb.group({
        nombre:['',Validators.required],
        hospital:['',Validators.required]
      });
      
      this.medicoForm.get('hospital')?.valueChanges
      .subscribe(hospitalId=>{
        this.hospitalSeleccionado=this.hospitales.find(h=>h._id===hospitalId)
      })
    }
    
  cargarMedico(id:string){

    if(id==='nuevo'){
      return;
    }
      
      this.MedicoService.obtenerMedicoById(id)
      .pipe(
        delay(100)
      )
      .subscribe(medico=>{

        if(!medico){
          this.router.navigateByUrl(`/dashboard/medicos`)
        }
        const {nombre, hospital:{_id}}=medico;
        this.medicoSeleccionado=medico;
        
         this.medicoForm.setValue({nombre,hospital:_id});
      })

  }

  cargarHospitales(){
    this.hospitalService.cargarHospitales()
    .subscribe((resp:Hospital[])=>{
      this.hospitales=resp;
    })

  }

  guardarMedico(){

    if(this.medicoSeleccionado){

      const data={
        ...this.medicoForm.value,
        _id:this.medicoSeleccionado._id
      }
      this.MedicoService.actualizarMedico(data)
      .subscribe(resp=>{
        Swal.fire('Actualizado', 
        `El médico ${data.nombre} se actualizó correctamente`,
        'success');
        this.router.navigateByUrl(`/dashboard/medicos/medico/${data._id}`)
      })
    }else{
      this.MedicoService.crearMedico(this.medicoForm.value)
          .subscribe(resp=>{
            Swal.fire('Actualizado', 
            `El médico ${this.medicoForm.value.nombre} se actualizó correctamente`,
            'success');
            this.router.navigateByUrl(`/dashboard/medicos/medico/${resp.msg._id}`)
          })

    }

  }

}
