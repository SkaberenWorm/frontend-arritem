import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Reserva } from 'src/app/commons/models/reserva.model';
import { ReservaService } from '../reserva.service';
import { Router } from '@angular/router';
import { UtilAlertService } from 'src/app/commons/util/util-alert.service';

@Component({
  selector: 'app-reserva-list',
  templateUrl: './reserva-list.component.html',
  styles: []
})
export class ReservaListComponent implements OnInit {
  public listaReservas: Array<Reserva>;
  public loading = true;
  public reservaFilter = '';

  constructor(
    private reservaService: ReservaService,
    private router: Router,
    private alert: UtilAlertService
  ) {}

  ngOnInit() {
    this.cargarData();
  }

  cargarData() {
    this.reservaService.listado().subscribe(result => {
      this.loading = false;
      if (!result.error) {
        console.log(result.resultado);
        this.listaReservas = result.resultado;
      } else {
        this.alert.warningSwal(result.mensaje);
      }
    });
  }

  filtrarReserva(input: string) {
    console.log(input);
  }

  guardarReserva(reserva: Reserva) {
    this.reservaService.guardar(reserva).subscribe(result => {
      if (!result.error) {
        this.alert.successSwal(result.mensaje);
      }
    });
  }

  newReserva() {
    this.router.navigate(['/reserva/new']);
  }
}
