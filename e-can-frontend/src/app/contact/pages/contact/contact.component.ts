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
  contactForm: FormGroup;
  isSending: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private emailService: EmailServicesService) {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  sendEmail() {
    // Check if all fields are valid
    if (this.contactForm.invalid) {
      return Object.values(this.contactForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    if (this.contactForm.valid && !this.isSending) {
      this.isSending = true;
      this.emailService.sendEmail(this.contactForm.value).subscribe(
        {
          next: resp => {
            this.contactForm.reset();
            console.log(resp);
            this.isSending = false;
          },
          error: err => {
            console.error('Error al enviar el formulario: ', err.error.msg);
            this.isSending = false;
          }
        }
      );
    }
  }
}
