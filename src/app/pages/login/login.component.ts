import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { AuthService, SnackbarService } from '../../core/services';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackbarService: SnackbarService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['eve.holt@reqres.in', [Validators.required, Validators.email]],
      password: ['cityslicka', Validators.required],
    });
  }

  onSubmit() {
    const { valid, value } = this.loginForm;

    if (!valid) {
      this.snackbarService.error(`Please fill all the required details`);
      return;
    }

    this.authService
      .loginUser(value)
      .pipe(
        catchError((error) => {
          this.snackbarService.error(`Login failed: ${error?.error?.error}`);
          return of(null);
        })
      )
      .subscribe((data: any) => {
        if (data) {
          localStorage.setItem('intelligent-token', data.token);
          this.snackbarService.success(`Login successful `);
          this.router.navigate(['/dashboard']);
        }
      });
  }

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }
}
