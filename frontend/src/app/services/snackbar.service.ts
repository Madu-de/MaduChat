import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  open(message: string, action: string = ''): MatSnackBarRef<TextOnlySnackBar> {
    const snackRef = this.snackBar.open(message, action, {
      duration: 5000,
      panelClass: ['snackbar']
    });
    return snackRef;
  }
}
