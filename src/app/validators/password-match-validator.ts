import { ValidatorFn } from '@angular/forms';

export const PasswordMatchValidator: ValidatorFn = (control) => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { passwordMismatch: false };
  }

  return null;
};
