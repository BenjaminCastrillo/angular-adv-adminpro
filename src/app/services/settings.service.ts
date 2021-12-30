import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme=document.querySelector('#theme');

  constructor() { 

    const theme=localStorage.getItem('theme')?localStorage.getItem('theme'):'default-dark';

    const url = `./assets/css/colors/${theme}.css`

    this.linkTheme?.setAttribute('href',url);
  }


  changeTheme(theme:string){

    const url = `./assets/css/colors/${theme}.css`

    this.linkTheme?.setAttribute('href',url);
    localStorage.setItem('theme',theme);
    this.checkCurrentTheme();

  }


  checkCurrentTheme(){

    const themeDisponibles: NodeListOf<Element>=document.querySelectorAll('.selector');
    
    themeDisponibles.forEach(elem=>{
      elem.classList.remove('working'); // eliminamos la clase working de los elemetos HTML

      const btnTheme= elem.getAttribute('data-theme');
      const btnThemeUrl=`./assets/css/colors/${btnTheme}.css` ;
      const currentTheme=this.linkTheme?.getAttribute('href');

      if (btnThemeUrl===currentTheme){
          // añadimos la clase working al elemento
        elem.classList.add('working');
      }

    });
  
  }

}
