import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ElacApiInterceptor implements HttpInterceptor {

  constructor( private snackBar: MatSnackBar) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next
      .handle(request)
      .pipe(
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            /** use for dev tasks */
            // console.log('@Response', event);
          }
        }),
        catchError(response => {
          if (response instanceof HttpErrorResponse) {
            this.snackBar.open(`REQUEST STATUS: ${response.statusText}`, `STATUS CODE: ${response.status}`, {
              duration: 2000,
              verticalPosition: 'top',
              panelClass: ['snackbar']
            });
          }
          return Observable.throw(response);
        })
      )
  }
}