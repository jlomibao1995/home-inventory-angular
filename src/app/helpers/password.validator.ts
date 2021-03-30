import { AbstractControl, ValidationErrors } from "@angular/forms";

export function passwordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password.pristine) {
        return null;
    }

    return   password && confirmPassword && password.value  != confirmPassword.value ? 
    { 'mismatch': true} : null;
}