import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { ElacApiEntity, ElacApiObjectEntity } from './../models/elac-api-entity';

const HTTP_PARAMS = new HttpParams();

@Injectable({
    providedIn: 'root'
})
export class ElacApiServices {

    QUERY_API_ENDPOINT = `${environment.api}${environment.apiQueryRepo}`;
    OBJECT_API_ENDPOINT = `${environment.api}${environment.apiObjectRepo}`;
    MEDIA_API_ENDPOINT = `${environment.api}${environment.apiMediaRepo}`;
    DOWNLOAD_API_ENDPOINT = `${environment.api}${environment.apiDownloadRepo}`;

    QUERY_SELECTOR(searchValue) {
        return HTTP_PARAMS.set('$search', searchValue);
    }

    FILTER_SELECTOR(p1, op, p2) {
        return HTTP_PARAMS.set('$filter', `${p1} ${op} ${p2}`)
    }

    EXPAND_SELECTOR(p1) {
        return HTTP_PARAMS.set('$expand', `${p1}`);
    }

    constructor(
        private http: HttpClient,
        private domSanitizer: DomSanitizer
    ) { }

    // ### make http-request ###
    get(endpoint: string, selectors: any) {
        return this.http.request('GET', endpoint, {
            params: new HttpParams({ fromString: `${selectors}` }),
            reportProgress: true
        });
    }

    // ### throw error ###
    apiError(response: HttpErrorResponse) {
        if (response.error instanceof ErrorEvent) {
            console.error(`Client or Network error occurred:, ${response.error.message}`);
        } else {
            console.error(`Backend error occurred: ${response.status}, ` + `${response.error}`);
        }
        return throwError(response.error || '@ERROR: ' + response)
    }

    // ### Connect to LAC Query-API ###
    query(selectorsToString: HttpParams): Observable<any> {
        return this.get(this.QUERY_API_ENDPOINT, selectorsToString)
            .pipe(
                map(response => new ElacApiEntity(response)),
                catchError(this.apiError)
            );
    }

    // ### Connect to LAC Object-API to retrieve an Object with certain id ###
    getObject(id, selectorStringSet: HttpParams): Observable<any> {
        return this.get(`${this.OBJECT_API_ENDPOINT}/Object(${id})`, selectorStringSet)
            .pipe(
                map(response => new ElacApiObjectEntity(response)),
                catchError(this.apiError)
            );
    }

    // ### Connect to LAC Object-API to retrieve an Objects ###
    getObjects(selectorStringSet: HttpParams): Observable<any> {
        return this.get(`${this.OBJECT_API_ENDPOINT}/Objects`, selectorStringSet)
            .pipe(
                map((response: any) => new ElacApiObjectEntity(response)),
                catchError(this.apiError)
            );
    }

    // ### get all data from Query-Response without filtering ###
    getAll() {
        return this.query(
            this.QUERY_SELECTOR('*')
                .append('$count', 'true')
        );
    }

    // ### filters Response from Query-API for Collections ###
    getAllCollections() {
        return this.query(
            this.QUERY_SELECTOR('*')
                .append('$top', '100')
                .append('$filter', `MetadataType eq Collection`)
                .append('$count', 'true')
        );
    }

    // ### filters Response from Query-API for Ids ###
    queryObject(id) {
        return this.query(
            this.FILTER_SELECTOR('id', 'eq', id)
                .append('pretty', 'true')
        );
    }

    // ### get all connected Objects-items ###
    expandObject(id) {
        return this.getObject(
            id, this.EXPAND_SELECTOR('parentOf')
                .set('pretty', 'true')
        );
    }

    // ### request certain file by Id from Download-API ###
    requestFile(id: string) {
        return this.domSanitizer.bypassSecurityTrustResourceUrl(`${this.DOWNLOAD_API_ENDPOINT}/${id}`);
    }

    // ### request certain media-file(e.g. video) by Id from Media-API ###
    requestMediafile(id: string) {
        return this.domSanitizer.bypassSecurityTrustResourceUrl(`${this.MEDIA_API_ENDPOINT}/${id}`);
    }

  // ### request thumbnail for certain media-file(e.g. video) by Id from Media-API ###
    requestThumbnail(id) {
        return this.domSanitizer.bypassSecurityTrustResourceUrl(`${this.MEDIA_API_ENDPOINT}/${id}/3,/full/500,/0/thumbnail/default.jpg`)
    }

}
