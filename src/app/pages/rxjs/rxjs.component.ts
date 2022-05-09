import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry ,take,map,filter} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit,OnDestroy {

  public intervalSubs:Subscription;

  constructor() {


    // this.retornaObservable().pipe(
    //  retry(1)
    // ).subscribe({
    //   next: (valor)=> console.log('Vuelta:', valor),
    //   error: (error)=> console.log('Error:',error),
    //   complete: ()=> console.log('se completo')
    // });

    console.log('inicio');
    this.intervalSubs=this.retornaIntervalo().subscribe({
      next: (a)=>console.log(a)
    });
    console.log('fin');
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {

      this.intervalSubs.unsubscribe();
  }

  retornaIntervalo():Observable<number>{

return interval(500).pipe(
 // take(10), Solo envia 10 respoestas
  map(a=>{return a+1}),
  filter(valor=> valor%2===0?true:false)
);


  }

  retornaObservable():Observable<number>{


    let i=-1;
    const obs$= new Observable<number>( observer=>{

 
    

      const intervalo= setInterval(()=>{
        i++;
        observer.next(i);

        if (i===4){
          clearInterval(intervalo);
          observer.complete();
        }

        if (i===2){
   
          observer.error('i llego a 2')        }

      },1000)
     });
    return obs$;  
  }

}
