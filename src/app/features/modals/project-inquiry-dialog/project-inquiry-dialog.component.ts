import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormGroupDirective, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContentService } from '../../../core/services/content.service';

@Component({
  selector: 'app-project-inquiry-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './project-inquiry-dialog.component.html'
})
export class ProjectInquiryDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ProjectInquiryDialogComponent>);
  readonly content = inject(ContentService);
  private readonly fb = inject(FormBuilder);
  private readonly snackBar = inject(MatSnackBar);

  @ViewChild('formDirective') formDirective?: FormGroupDirective;

  isSubmitting = false;
  submitted = false;

  readonly form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    company: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9+ -]{8,15}$/)]],
    email: ['', [Validators.required, Validators.email]],
    location: ['Bengaluru', [Validators.required]],
    projectType: ['Office & Workplace', [Validators.required]],
    timeline: ['Immediate / Underway', [Validators.required]],
    requirements: ['', [Validators.required, Validators.minLength(10)]]
  });

  async onSubmit(formDirective?: FormGroupDirective): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.isSubmitting) return;
    this.isSubmitting = true;

    try {
      const payload = new URLSearchParams();
      payload.append('form-name', 'project-inquiry');
      Object.keys(this.form.value).forEach(key => {
        payload.append(key, this.form.value[key] || '');
      });

      if (typeof fetch !== 'undefined') {
        await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: payload.toString()
        });
      }

      this.submitted = true;
      this.snackBar.open('Inquiry received! Our team will contact you shortly.', 'Close', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
      setTimeout(() => this.dialogRef.close(), 1500);
    } catch (e) {
      this.snackBar.open('Error submitting. Please call or WhatsApp us directly.', 'Close', {
        duration: 6000
      });
    } finally {
      this.isSubmitting = false;
    }
  }
}
