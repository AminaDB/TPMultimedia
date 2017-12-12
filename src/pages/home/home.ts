import { Component } from '@angular/core';

import { DetailsPage } from '../details/details';
import { Observable } from 'rxjs/Observable';
import { API_key } from '../../app/tmdb';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AsyncPipe } from '@angular/common';
import { AlertController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { Shake } from '@ionic-native/shake';

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
  shakeSubscription : Subscription;


  films: Observable<Result[]> = Observable.of([]);
  
  constructor(private http_client : HttpClient, public shake : Shake ,public alertCtrl: AlertController, public navCtrl: NavController) {
    
  }

 /* getResults($event : any) : void {
    const val: string = $event.target.value;
    if (val) {
      this.films = this.fetchResults(val);
    }
    else {
      this.films = Observable.of([]);
    }
  }*/

  ionViewDidLoad() {
    this.shakeSubscription = this.shake.startWatch() .switchMap(() => this.discoverMovies())
    .subscribe(movies => this.showRandomMovieAlert(movies));
  }
  ionViewWillLeave() {
    this.shakeSubscription.unsubscribe(); 
  }


  fetchResults(val:string):Observable<Result[]>{
    return this.http_client.get<Result[]>('https://api.themoviedb.org/3/search/movie',{
      params: new HttpParams().set('api_key', API_key).set('query',val)
    }).pluck('results');
  }

  private discoverMovies():Observable<Result[]>{
    return this.http_client.get<Result[]>('https://api.themoviedb.org/3/discover/movie',{
      params: new HttpParams().set('api_key', API_key).set('primary_release_year','2018')
    }).pluck('results');
  }

  private showRandomMovieAlert(movies: Result[]): void{

    var movie = movies[Math.floor(Math.random()*movies.length)];

    let confirm = this.alertCtrl.create({
      title: movie.title,
      message: movie.overview,
      buttons: [
        {
          text: 'Details',
          handler: () => {
            this.navCtrl.push(DetailsPage);
          }
        },
        {
          text: 'Cancel',
        }
      ]
    });
    confirm.present();
  }  
}

