/**
 * Created by javie on 8/04/2017.
 */
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Hero} from './Hero';

@Injectable()
export class HeroSearchService{
  constructor(private http: Http){}
  search(term: string): Observable<Hero[]>{
    return this.http.get('app/heroes/?nombre=' + term)
      .map(response => response.json().data as Hero[]);
  }
}
