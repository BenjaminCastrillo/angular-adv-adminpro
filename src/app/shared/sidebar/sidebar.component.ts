import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public menuItems!:any[];
  public usuario:Usuario|undefined;

  constructor(public sidebarService:SidebarService,
    private usuarioService:UsuarioService) { 
  
    this.usuario=this.usuarioService.usuario;
    this.menuItems=this.sidebarService.menu;
    console.log('SIDEBAR COMPONENT cojo el menu de la variable publica this.menu de sidebar services',this.menuItems);

  }

  ngOnInit(): void {
  }
  logout(){
    this.usuarioService.logout();
  }
}
