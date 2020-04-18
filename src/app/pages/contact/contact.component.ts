import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers: [MatSnackBar]
})
export class ContactComponent implements OnInit {

  showAlert = false;
  loading = false;

  constructor(private contactService: ContactService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open( message, action, {
      duration: 3000,
    });
  }

  sendMail(fContact: NgForm) {
    if (!fContact.valid) {
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 1500);
    }else {
      let element = document.getElementById('boton-enviar');
      element.innerHTML = `<span *ngIf="loading" class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
      Enviando...`
      this.loading = true;
      this.contactService.sendMail(fContact.value)
        .subscribe( data => {
          element.innerHTML = 'Enviar';
          this.openSnackBar('El mensaje ha sido enviado', 'Aceptar');
          fContact.reset();
        },
        err => {
          if(err.error.text == 'Error: No recipients defined') {
            this.openSnackBar('Al parecer el correo ingresado no es válido. Por favor, ingresa otro', 'Aceptar')
            element.innerHTML = 'Enviar';
          }          
        });
    }
  }
}
