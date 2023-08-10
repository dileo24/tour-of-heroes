import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  heroes: Hero[] = [];

  //inyecta la dependencia HeroService en el componente
  constructor(private heroService: HeroService) {}

  //llama a getHeroes para obtener la lista de héroes
  ngOnInit(): void {
    this.getHeroes();
  }

  //usa heroService para obtener la lista de heroes y se suscribe al observable que devuelve getHeroes
  //para tener los valores de manera asincrónica
  getHeroes() {
    this.heroService
      .getHeroes()
      .subscribe((hero) => (this.heroes = hero.slice(1, 5)));
  }
}
