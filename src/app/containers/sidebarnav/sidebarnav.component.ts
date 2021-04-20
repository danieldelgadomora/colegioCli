import { ColegioService } from './../../app_core/services/colegio-service/colegio.service';
import { Component } from '@angular/core';
@Component({
  selector: 'app-sidebarnav',
  templateUrl: './sidebarnav.component.html',
  styleUrls: ['./sidebarnav.component.scss']
})
export class SidebarnavComponent {

  /**
   * Variable donde se alamcena la información del colegio
   */
  colegio : any;

  /**
   * Constructor de SidebarnavComponent
   * @param serviceColegio
   */
  constructor(
    private serviceColegio: ColegioService
  ){
  }

  /**
   * Función que permite iniciar y cargar la información del colegio
   */
  async ngOnInit() {
    try {
      this.colegio = await this.serviceColegio.getColegio(1).toPromise()
      console.log(this.colegio)
    } catch (error) {

    }
  }


}
