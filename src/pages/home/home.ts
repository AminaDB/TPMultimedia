import { Component } from '@angular/core';

import { DetailsPage } from '../details/details';
import { Observable } from 'rxjs/Observable';
import { API_key } from '../../app/tmdb';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AsyncPipe } from '@angular/common';

export interface Result {
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date : string;
}


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  DetailPage : any = DetailsPage;

  films: Observable<Result[]> = Observable.of([]);
  constructor(private http_client : HttpClient) {
      
  }

  getResults($event : any) : void {
    const val: string = $event.target.value;
    if (val) {
      this.films = this.fetchResults(val);
    }
    else {
      this.films = Observable.of([]);
    }
  }

  fetchResults(val:string):Observable<Result[]>{
    return this.http_client.get<Result[]>('https://api.themoviedb.org/3/search/movie',{
      params: new HttpParams().set('api_key', API_key).set('query',val)
    }).pluck('results');
  }

}

