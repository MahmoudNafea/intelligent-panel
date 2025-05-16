import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-new-user-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './new-user-modal.component.html',
  styleUrl: './new-user-modal.component.scss'
})
export class NewUserModalComponent {
  userForm: FormGroup;
  avatarFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewUserModalComponent>
  ) {
    this.userForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onFileSelected(event: any) {
    this.avatarFile = event.target.files[0] ?? null;
  }

  submitForm() {
    if (this.userForm.valid) {
      const formData = {
        ...this.userForm.value,
        avatar: this.avatarFile
      };
      this.dialogRef.close(formData);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
