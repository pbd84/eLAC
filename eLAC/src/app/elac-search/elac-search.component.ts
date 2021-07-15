import { Location } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, forkJoin } from 'rxjs';
import { debounceTime, distinctUntilChanged, finalize, pluck, switchMap, tap } from 'rxjs/operators';
import { ElacApiServices } from '../services/elac-api-services';
import { ElacDataService } from '../services/elac-data.service';

const HTTP_PARAMS = new HttpParams();

@Component({
  selector: 'app-elac-search',
  templateUrl: './elac-search.component.html',
  styles: [`
    .search-full-width {
      width: 100%;
    }

    .mat-form-field-infix{
      display: block !important;
      flex: auto!important;
      width: 110px;
    }
   .mat-form-field-prefix {
     font-size: 100%;
   }

  .mat-hint {
    color: #ffffff;
  }
  `]
})
export class ElacSearchComponent implements OnInit {

  @ViewChild('searchbar') input;

  hints;
  inProgress: boolean;
  // info = 'Search for audio, video files ...';

  constructor(
    private apiSvc: ElacApiServices,
    private elacDataSvc: ElacDataService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    const inputBox = document.getElementById('text-input');

    const userInput$ = fromEvent(inputBox, 'keyup');
    // ### monitors inputBox and passes searchterm to following functions ###
    userInput$
      .pipe(
        debounceTime(200),
        pluck('target', 'value'),
        distinctUntilChanged(),
        tap((val) => {
          this.gotoSearch();
          this.adjustBrowserUrl(val);
        }),
        switchMap(searchTerm => this.doSearch(searchTerm))
      )
      .subscribe(response => this.elacDataSvc.setData(response.dataset))
  }

  // ### retrieve query data for autocompletion in searchbar ###
  doSearch(term) {
    this.inProgress = true
    return this.apiSvc
      .query(
        HTTP_PARAMS
          .set('$search', term)
          .append('$filter', `(ResourceMimeType eq video/mp4 or ResourceMimeType eq audio/x-wav)`)
          .append('$count', 'true')
          .append('highlight', 'true')
          .append('pretty', 'true')
          .append('autocomplete', 'true')
      )
      .pipe(
        finalize(() => this.inProgress = false),
        tap((response) => this.hints = response.autocompletes)
      )
  }

  // ### navigate to component: elac-search-hits ###
  gotoSearch() {
    this.router.navigate(['/s']);
  }

  // ### adjusts URL and passes searchstring as parameter in URL ###
  adjustBrowserUrl(query) {
    const absoluteUrl = this.location.path().split('?')[0];
    const queryPart = query !== '' ? `=${encodeURI(query)} ` : '';

    return this.location.replaceState(absoluteUrl, queryPart);
  }

  clearInput() {
    this.input.nativeElement.value = '';
    this.adjustBrowserUrl('');
  }
}
