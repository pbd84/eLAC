import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';
import { flatMap, pluck, tap, scan } from 'rxjs/operators';
import { ElacApiServices } from './../services/elac-api-services';
import { ElacDataService } from './../services/elac-data.service';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';


@Component({
  selector: 'app-elac-collection',
  templateUrl: './elac-collection.component.html',
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
export class ElacCollectionComponent implements OnInit {

  collection$: Observable<any>;
  collectionBundles = [];

  public data: Array<any> = this.collectionBundles;

  constructor(
    private activeRoute: ActivatedRoute,
    private apiSvc: ElacApiServices,
    private dataService: ElacDataService
  ) {
    this.dataService.passData(this.data);
  }

  ngOnInit(): void {

    // ### fetch collection Id from received parameter in URL ###
    const collectionId = `hdl:${this.activeRoute.snapshot.params.prefix}/${this.activeRoute.snapshot.params.id}`;

    // ### get Objects connected to Collection ###
    this.collection$ = this.apiSvc.expandObject(collectionId);
    const expandCollectionBundles = this.collection$
      .pipe(
        pluck('parentOf'),
        flatMap(bundle => bundle),
      );

    expandCollectionBundles
      .subscribe((bundle: any) => {

        forkJoin({
          query: this.apiSvc.queryObject(bundle.id).pipe(pluck('value')),
          object: this.apiSvc.expandObject(bundle.id)
        })
          .subscribe(data => this.collectionBundles.push(data))
          console.log('datatioass', this.data)
      });
  }


  // ##### functions for retrieving data from API-Service #####
  src(id) {
    return this.apiSvc.requestMediafile(id);
  }

  generateThumbnail(id) {
    return this.apiSvc.requestThumbnail(id);
  }

  downloadFile(id) {
    return this.apiSvc.requestFile(id);
  }
  // ##### /functions for retrieving data from API-Service #####

  // ### filter for pdf, audio and video files ###
  filteredFiles(col) {
   return col.filter((file) => file.contentType.endsWith('pdf') || file.contentType.startsWith('audio') || file.contentType.startsWith('video'))
  }
}
