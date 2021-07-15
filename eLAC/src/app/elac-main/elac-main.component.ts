import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ElacApiServices } from './../services/elac-api-services';

@Component({
  selector: 'app-elac-main',
  templateUrl: './elac-main.component.html',
  styles: [`
  .mat-card {
    margin-top: 15px;
  }
  `]
})

// ### calls API-Service to get all collections from LAC as Observable ###
export class ElacMainComponent implements OnInit {

  data$: Observable<any>;

  constructor(private apiSvc: ElacApiServices) { }

  ngOnInit(): void {
    this.data$ = this.apiSvc.getAllCollections();
  }

}
