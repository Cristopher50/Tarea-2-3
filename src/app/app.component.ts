import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, HostListener, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mobileQuery: MediaQueryList;
  menu = {
    name: "Home",
  }

  fillerNav = [
    { id:'a', name: "Agregar empleado", url: "home/empleado/add"},
    { id:'b', name: "Eliminar empleado", url: "home/empleado/delete"},
    { id:'c', name: "Modificar empleado", url: "home/empleado/update" },
    { id:'d', name: "Relacionar empleado con vacante" , url: "home/empleado/delete"},
    { id:'f', name: "Eliminar empleado " , url: "home/empleado/agregarEmpleado"},
    { id:'g', name: "Imprimir informe de vacantes disponibles", url: "home/vacante/print"},
    { id:'h', name: "Consulta de empleados " , url: "home/empleado/all"},
    { id:'i', name: "Imprimir informe de coincidencias exitosas", url: "home/informe/print"},
    { id:'j', name: "Consulta de empleos", url: "home/empleo/all"},
    { id:'k', name: "Agregar vacante", url: "home/vacante/vacante"},
    { id:'l', name: "Modificar vacante", url: "home/vacante/update"},
    { id:'m', name: "Agregar patrón", url: "home/patron/add"},
    { id:'n', name: "Eliminar vacante", url: "home/vacante/delete"},
    { id:'o', name: "Modificar patrón", url: "home/patron/update"},
  ];

  @ViewChild('snav') snav: MatSidenav;
  @ViewChildren('a') viewChildren!: QueryList<any>;

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.altKey && event.key === 'x') {
      this.snav.toggle()
    }

    this.fillerNav.forEach( element => {
      if (event.altKey && event.key === element.id) {

         this.viewChildren.forEach(item => {
           if(item._element.nativeElement.id == element.id){
             item._element.nativeElement.focus();
             this.menu.name = '';
             this.menu.name = item._element.nativeElement.name;
           }
        });
      }
    });
  }

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  shouldRun = true;

  click(nav: any){
    this.menu.name = '';
    this.menu = nav;
  }
}
