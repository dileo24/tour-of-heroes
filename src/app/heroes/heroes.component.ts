import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes', // tag para conectar a este componente desde cualquier html
  //template: `<h1>Hola!</h1>`, //se puede usar el html acá directamente
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent {
  heroes: Hero[] = []; //declaro heroes como un arreglo vacío de objetos Hero
  selectedHero?: Hero; //puede no tener un valor asignado inicialmente, tipo: hero

  //acepta una inyección de dependencia de los servicios
  constructor(
    private heroService: HeroService,
    private messageService: MessageService
  ) {}
  //permite al componente usar métodos y props de los servicios

  //ngOnInit se ejecuta después de que inicializa el componente y resuelve las inyecciones
  //o sea que se llama a getHeroes para tener la lista de héroes al iniciar el componente
  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService
      .getHeroes() //llamo al método getHeroes que devuelve un observable
      .subscribe((x) => (this.heroes = x)); //me "suscribo" al observable para recibir sus valores
    //"x" es el valor que emite, o sea el array de HEROES,m así que se lo asigno a la prop "heroes"
  }
  onSelected(hero: Hero): void {
    this.messageService.add(`Seleccionaste al héroe ${hero.name}`);
    //se pone void porque no devuelve ningún valor
    //método que toma un un objeto Hero como argumento
    this.selectedHero = hero; //asigna el héroe seleccionado a la prop selectedHero
  }
}
