import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { scan, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

// ### Data Service for communication/exchange (of data) between components ###
export class ElacDataService {

  passData$: Observable<any>;
  private dataSubjectsearch = new Subject<any>();
  private dataSubject = new BehaviorSubject<any>('');

  constructor() {
    this.passData$ = this.dataSubject.asObservable();
  }

  passData(data) {
    this.dataSubject.next(data);
    console.log('dataservice', data);
  }

  setData(data: any) {
    this.dataSubjectsearch.next(data);
  }

  //clearData() {
  //  this.dataSubject.next();
  //}

  getData() {
    return this.dataSubjectsearch.asObservable();
  }
}
