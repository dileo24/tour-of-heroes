import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';

@Component({
  selector: 'app-heroes', // tag para conectar a este componente desde cualquier html
  //template: `<h1>Hola!</h1>`, //se puede usar el html acá directamente
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent {
  heroes = HEROES; //se inicializa la prop heroes con un array HEROES
  selectedHero?: Hero; //puede no tener un valor asignado inicialmente, tipo: hero

  onSelected(hero: Hero): void {
    //se pone void porque no devuelve ningún valor
    //método que toma un un objeto Hero como argumento
    this.selectedHero = hero; //asigna el héroe seleccionado a la prop selectedHero
  }

  //creé variable directo sin interfaz
  //gender = 'male';

  //creé al héroe usando los tipos declarados en la interfaz
  /*  hero: Hero = {
    id: 1,
    name: 'Windstorm',
  }; */
}
