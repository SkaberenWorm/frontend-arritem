import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-ver-usuario-modal',
  templateUrl: './ver-usuario-modal.component.html',
  styles: []
})
export class VerUsuarioModalComponent implements OnInit {
  closeResult: string;
  cliente: Cliente = new Cliente();

  @ViewChild('contentDetalleCliente', { static: false })
  content: ElementRef;
  constructor(private modalService: NgbModal) {}

  ngOnInit() {}

  public open(cliente?: Cliente) {
    if (cliente != null) {
      this.cliente = cliente;
      console.log(this.cliente);
    }
    this.modalService
      .open(this.content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
