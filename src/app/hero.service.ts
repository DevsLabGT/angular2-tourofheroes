/**
 * Created by javie on 7/04/2017.
 */
import {Injectable} from '@angular/core';
import {Hero} from './Hero'
import {Heroes} from './mock-heroes'
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise'

@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes';

  constructor(private http: Http){}

  getHeroes(): Promise<Hero[]> {
    //return Promise.resolve(Heroes);
    return this.http.get(this.heroesUrl).toPromise().then(response => response.json().data as Hero[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any>{
    console.error('hubo un error', error);
    return Promise.reject(error.message || error);
  }

  getHero(id: number): Promise<Hero>{
    //return this.getHeroes().then(heroes => heroes.find(hero=>hero.id===id));
    const url = this.heroesUrl + '/' + id;
    return this.http.get(url).toPromise().then(response => response.json().data as Hero)
      .catch(this.handleError);
  }

  private headers = new Headers({'Content-Type': 'application/json'});
  update(hero: Hero): Promise<Hero>{
    const url = this.heroesUrl + '/' + hero.id;
    return this.http.put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise().then(()=>hero)
      .catch(this.handleError);
  }

  create(nombre: string): Promise<Hero>{
    return this.http.post(this.heroesUrl, JSON.stringify({nombre: nombre}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Hero)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void>{
    const url = this.heroesUrl + '/' + id;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(()=>null)
      .catch(this.handleError);
  }
}
