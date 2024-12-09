import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  confirmAction(message: string, confirmText: string = 'Yes', cancelText: string = 'No') {
    return Swal.fire({
      title: 'Confirm',
      text: message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
    });
  }

  success(message: string, title: string = 'Success') {
    return Swal.fire({
      icon: 'success',
      title: title,
      text: message,
      confirmButtonText: 'OK',
    });
  }

  error(message: string, title: string = 'Error') {
    return Swal.fire({
      icon: 'error',
      title: title,
      text: message,
      confirmButtonText: 'OK',
    });
  }

}
