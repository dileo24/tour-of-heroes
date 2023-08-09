import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes', // tag para conectar a este componente desde cualquier html
  //template: `<h1>Hola!</h1>`, //se puede usar el html acá directamente
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent {
  heroes: Hero[] = []; //declaro heroes como un arreglo vacío de objetos Hero
  selectedHero?: Hero; //puede no tener un valor asignado inicialmente, tipo: hero

  constructor(private heroService: HeroService) {}

  //ngOnInit se ejecuta después de que inicializa el componente y resuelve las inyecciones
  //o sea que se llama a getHeroes para tener la lista de héroes al iniciar el componente
  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroes = this.heroService.getHeroes();
    //le asigno al arreglo heroes los valores que trae el getHeroes del HeroService
  }
  onSelected(hero: Hero): void {
    //se pone void porque no devuelve ningún valor
    //método que toma un un objeto Hero como argumento
    this.selectedHero = hero; //asigna el héroe seleccionado a la prop selectedHero
  }
}
