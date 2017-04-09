import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Hero } from './Hero'
import {HeroService} from './hero.service'

@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})

export class HeroesComponent implements OnInit  {
  heroes: Hero[];
  selectedHero: Hero;
  onSelect(hero: Hero): void {
    console.log(hero);
    this.selectedHero = hero;
  }
  constructor(
    private heroService: HeroService,
    private router: Router,
  ){}
  getHeroes(): void{
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);//Donde heroes es el resultado del then y al hacer => segun ES6 se pasa como su fuera un function(heroes){
  }
  goToDetail(): void{
    this.router.navigate(['/detalle', this.selectedHero.id]);
  }
  add(nombre: string): void{
      nombre = nombre.trim();
      if(!nombre){return;}
      this.heroService.create(nombre)
        .then(hero=>{this.heroes.push(hero); this.selectedHero=null;});
  }
  delete(hero: Hero): void{
      this.heroService.delete(hero.id)
        .then(()=>{
          this.heroes = this.heroes.filter(h =>h !== hero);
          if(this.selectedHero === hero){this.selectedHero = null;}
        });
  }
  ngOnInit(): void{
    this.getHeroes();
  }
}
