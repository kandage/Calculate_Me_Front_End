import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,} from '@angular/common/http';
import {catchError, finalize, Observable, throwError} from 'rxjs';
import {SnackBarService} from "../services/snack-bar/snack-bar.service";
import {LoadingService} from "../services/loading/loading.service";

@Injectable()
export class HttpHandlerInterceptor implements HttpInterceptor {

    constructor(
        private _loadingService: LoadingService,
        private snackBarService: SnackBarService
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this._loadingService.mainLoader.next(true);

      return next.handle(request).pipe(
        catchError(err => {
          if (err.status == 401 || err.status == 403) {
            alert('Unauthorized');
          } else {

          }
          const error = err.error.message || err.statusText;
          return throwError(error);
        }),
        finalize(() => {
          this._loadingService.mainLoader.next(false);
        })
      );
    }
}
