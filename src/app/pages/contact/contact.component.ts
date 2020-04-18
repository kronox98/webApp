import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  formContact = {
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  }

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
  }

  sendMail(fContact) {
    console.log(fContact);
    console.log(this.formContact);

    this.contactService.sendMail(this.formContact)
      .subscribe( data => {
        console.log('Mensake: ', data);
        
      });
  }

}
