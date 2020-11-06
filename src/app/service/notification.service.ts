import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackBar: MatSnackBar) { }

  config: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'left',
    verticalPosition: 'top'

  }

  success(msg){
    this.config['panelClass'] = ['notification', 'success'];
    //msg es el mensaje y '' es el evento que sera empty 
    this.snackBar.open(msg, '', this.config);

  }

  warn(msg) {
    this.config['panelClass'] = ['notification', 'warn'];
    this.snackBar.open(msg, '', this.config);
  }
}
