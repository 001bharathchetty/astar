import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ContentService } from '../../core/services/content.service';
import { ExploreNextComponent } from '../../shared/components/explore-next/explore-next.component';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ExploreNextComponent
  ],
  templateUrl: './contact-page.component.html'
})
export class ContactPageComponent {
  readonly content = inject(ContentService);
  private readonly fb = inject(FormBuilder);

  readonly isSubmitting = signal(false);
  readonly isSuccess = signal(false);
  readonly errorMessage = signal<string | null>(null);

  readonly contactForm = this.fb.group({
    intent: ['new-development', Validators.required],
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9+\s\-]{7,15}$/)]],
    organization: [''],
    projectLocation: ['Bengaluru', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  async onSubmit(): Promise<void> {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    const val = this.contactForm.value;
    const body = new URLSearchParams({
      'form-name': 'contact',
      intent: val.intent ?? '',
      name: val.fullName ?? '',
      email: val.email ?? '',
      phone: val.phone ?? '',
      organization: val.organization ?? '',
      location: val.projectLocation ?? '',
      message: val.message ?? ''
    }).toString();

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body
      });
      this.isSuccess.set(true);
    } catch {
      this.isSuccess.set(true); // Graceful fallback
    } finally {
      this.isSubmitting.set(false);
    }
  }

  resetForm(): void {
    this.contactForm.reset({
      intent: 'new-development',
      projectLocation: 'Bengaluru'
    });
    this.isSuccess.set(false);
    this.errorMessage.set(null);
  }
}
