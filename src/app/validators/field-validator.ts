import { FormGroup } from '@angular/forms';

export const isInvalid = (form: FormGroup, field: string): boolean | null => {
  const control = form.get(field);
  return control && control.touched && control.invalid;
};

export const getErrorMessage = (form: FormGroup, field: string): string | null => {
  const control = form.get(field);
  if (control && control.errors) {
    if (control.errors['required']) {
      return `*Field is required`;
    }
    if (control.errors['minlength']) {
      return `*Field must be at least ${control.errors['minlength'].requiredLength} characters long`;
    }
    if (control.errors['maxlength']) {
      return `*Field cannot exceed ${control.errors['maxlength'].requiredLength} characters`;
    }
    if (control.errors['pattern']) {
      return `*Invalid format for field`;
    }
  }
  return null;
};