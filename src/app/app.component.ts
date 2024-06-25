import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public menus = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Remedios', url: '/remedios', icon: 'medkit' },
    { title: 'Fabricantes', url: '/fabricantes', icon: 'people-circle' },
    { title: 'Sintomas', url: '/sintomas', icon: 'thermometer' },
  ];
  constructor() {}
}
