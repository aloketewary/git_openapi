import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { retry, tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GitService {

  constructor(private httpClient: HttpClient) { }

  getAllUsers<T>(nextPage: number): Observable<T> {
    const url = `${environment.ROOT_URL}/users?since=${nextPage}`;
    return this.httpClient.get<T>(url).pipe(
      retry(2),
      tap((_: T) => console.log('Fetched All Users')),
      catchError(this.handleError<T>(url))
    );
  }

  private handleError<T>(uri: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error('http request failed:', uri);
      console.error('error', error);
      console.error('response', JSON.stringify(result));
      return of(result);
    };
  }

  getAllReposForUsers<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(url).pipe(
      retry(2),
      tap((_: T) => console.log('Fetched Users Repo')),
      catchError(this.handleError<T>(url))
    );
  }
}
