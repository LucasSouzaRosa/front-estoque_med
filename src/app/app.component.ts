import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public menus = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Remedios', url: '/remedio', icon: 'remedio' },
    { title: 'Fabricantes', url: '/fabricante', icon: 'people-circle' },
  ];
  constructor() {}
}
