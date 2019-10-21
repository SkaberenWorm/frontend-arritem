import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Reserva } from 'src/app/commons/models/reserva.model';
import { ReservaService } from '../reserva.service';
import { Router } from '@angular/router';
import { UtilAlertService } from 'src/app/commons/util/util-alert.service';
import { FiltroGeneral } from 'src/app/commons/models/filtro-general.model';
import { SearchPagination } from 'src/app/commons/interfaces/search-pagination';

@Component({
  selector: 'app-reserva-list',
  templateUrl: './reserva-list.component.html',
  styles: []
})
export class ReservaListComponent implements OnInit {
  public listaReservas: Array<Reserva> = new Array<Reserva>();
  public loading = false;
  public reservaFilter = '';

  public page = 1;
  public pageSize = 8;
  public totalElements = 0;
  public searchPagination: SearchPagination<FiltroGeneral>;
  public filtroGeneral: FiltroGeneral = new FiltroGeneral();

  constructor(
    private reservaService: ReservaService,
    private router: Router,
    private alert: UtilAlertService
  ) {}

  ngOnInit() {
    this.cargarData();
  }

  cargarData() {
    /*  this.reservaService.listado().subscribe(result => {
      this.loading = false;
      if (!result.error) {
        console.table(result.resultado);
        this.listaReservas = result.resultado;
      } else {
        this.alert.warningSwal(result.mensaje);
      }
    }); */

    if (!this.loading) {
      this.loading = true;
      this.searchPagination = {
        seek: this.filtroGeneral,
        page: this.page,
        records: this.pageSize
      };
      console.log(this.searchPagination);
      this.listaReservas = [];

      this.reservaService.listSearchPagination(this.searchPagination).subscribe(result => {
        if (!result.error) {
          this.listaReservas = result.resultado.content;
          this.totalElements = result.resultado.totalElements;
          console.table(this.listaReservas);
        } else {
          this.alert.errorSwal(result.mensaje);
        }
        this.loading = false;
      });
    }
  }

  filtrarReserva(input: string) {
    this.filtroGeneral.filtro = input;
    //this.cargarData();
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

  filtrarreserva(filtro: string) {
    console.log(filtro);
  }
}
