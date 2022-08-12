import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';

declare function customInitFunctions():void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {


  

  year = new Date().getFullYear();
  constructor(private settingsService:SettingsService,
              private sidebarService:SidebarService) { }

  ngOnInit(): void {
    customInitFunctions();
    console.log('voy a cargar menu');
    this.sidebarService.cargarMenu();
    console.log('en pages component despues de cargar menu',this.sidebarService.menu);

  }

}
