import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-promesa',
  templateUrl: './promesa.component.html',
  styles: [
  ]
})
export class PromesaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.getUsuarios()
    .then(a=>console.log(a))
    // const promesa = new Promise((resolve,reject)=>{
    // if (false)
    //   resolve('hola mundo')
    // else reject('error 33') 
    // });

    // promesa.then( (mensaje)=>{

    //   console.log(mensaje)
    // })
    // .catch (error=> console.log(error))
    // console.log('despues de la promesa')
  }
getUsuarios(){

return new Promise((resolve,reject)=>{
  
  fetch('https://reqres.in/api/users')
  .then (a=> a.json())
  .then (body=>resolve(body.data));
});
  
}

}
