import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  private show(message: string, config: MatSnackBarConfig) {
    this.snackBar.open(message, 'Close', config);
  }

  success(message: string) {
    this.show(message, {
      duration: 3000,
      panelClass: ['snack-success'],
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  error(message: string) {
    this.show(message, {
      duration: 3000,
      panelClass: ['snack-error'],
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

}
