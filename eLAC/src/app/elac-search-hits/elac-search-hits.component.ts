import { Component, OnInit } from '@angular/core';
import { ElacDataService } from '../services/elac-data.service';
import { Observable, forkJoin, pipe } from 'rxjs';
import {pluck, tap, reduce, scan, flatMap} from 'rxjs/operators';
import { ElacApiServices } from '../services/elac-api-services';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-elac-search-hits',
  templateUrl: './elac-search-hits.component.html',
  styles: [`
    .mat-card {
      margin-top: 50px;
    }
    a {
      color: black;
    }
    a:visited {
      color: black;
    }
    a:hover, a:active, a:focus {
      color:black;
    }
  `]
})
export class ElacSearchHitsComponent implements OnInit {

  data$: Observable<any>;
  results = [];
  temp = [];
  result;

  public data: Array<any> = this.results;

  constructor(
    private activeRoute: ActivatedRoute,
    private dataService: ElacDataService,
    private apiSvc: ElacApiServices
  ) {
    this.dataService.passData(this.data);
  }

  ngOnInit(): void {
    // ### gets results from search-component and queries ObjectAPI ###
    this.data$ = this.dataService.getData();

    const loadsearch = this.data$.subscribe(temp => {
      temp.forEach(item => {
        this.apiSvc
          .expandObject(item.id)
          .subscribe(data => {
            this.temp.push(data);
            this.result = [...new Map(this.temp.map(item => [item['id'], item])).values()];
            console.log('myresult', this.result)
          });
      })
    });
    // ### initialize function passDataToPlayer to generate merged data (querydata and objectdata) to pass to DataService ###
    // ### might need to be worked over because data gets loaded twice###
    this.passDataToPlayer()
  }

  passDataToPlayer(){
    const files = this.data$.subscribe(results => {
      results.forEach(item => {
        forkJoin({
          query: this.apiSvc.queryObject(item.id).pipe(pluck('value')),
          object: this.apiSvc.expandObject(item.id)
        })
          .subscribe(data => this.results.push(data))
          console.log('datatopass',this.data)
      })
    });
  }

  src(id) {
    return this.apiSvc.requestMediafile(id);
  }

  generateThumbnail(id) {
    return this.apiSvc.requestThumbnail(id)
  }

  downloadFile(id) {
    return this.apiSvc.requestFile(id);
  }

  filteredFiles(col) {
    return col.filter((file) => file.contentType.endsWith('pdf') || file.contentType.startsWith('audio') || file.contentType.startsWith('video'))
  }

}
