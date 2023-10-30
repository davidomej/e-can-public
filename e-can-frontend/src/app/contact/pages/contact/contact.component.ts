import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailServicesService } from 'src/app/services/email-services.service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup | any;

  constructor(private formBuilder: FormBuilder,
    private emailService: EmailServicesService) {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required]],
    });
  }

  sendEmail() {
    if (this.contactForm.valid) {
      this.emailService.sendEmail(this.contactForm.value).subscribe((response) => {
        console.log(response);
      },
        (error) => {
          console.error('Error al enviar el formulario: ', error);
        }
      );
    }
  }

}
