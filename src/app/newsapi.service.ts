import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Configuration } from './Configuration';
import * as moment from 'moment';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsapiService {

  private newsApiUrl = '';  // URL to web api

  constructor(private http: HttpClient,
    private configuration: Configuration) { }

  formURL(searchTerm: string) {

      // find current date - 6 months
      const fromDate = moment().format().substr(0, 10);
      const toDate = moment().subtract(6, 'months').format().substr(0, 10);

     // other restrictions can be added here
      this.newsApiUrl = this.configuration.server +
                        searchTerm +
                        '&from=' + fromDate +
                        '&to=' + toDate
                        + this.configuration.apikey;

  }

  /** GET news from the server for specific term*/
  getNewsList (searchTerm: string) {

      // form the url using configuration and searchTerm
      this.formURL(searchTerm);

      console.log ('The URL is: ' + this.newsApiUrl) ;

      return this.http.get(this.newsApiUrl)
      .pipe(tap(news => console.log(news)),
        catchError(this.handleError('getNewsList', [])));

  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
