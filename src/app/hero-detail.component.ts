/**
 * Created by javie on 7/04/2017.
 */
import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';

import 'rxjs/add/operator/switchMap'

import {Hero} from './Hero'
import {HeroService} from './hero.service';

@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit{
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    protected location: Location
  ){}
  hero: Hero;
  ngOnInit(): void{
    this.route.params.switchMap((params: Params)=> this.heroService.getHero(+params['id']))
      .subscribe(hero=>this.hero=hero);
  }
  goBack(): void{
    this.location.back();
  }
  save(): void{
    this.heroService.update(this.hero)
      .then(() => this.goBack());
  }
}
