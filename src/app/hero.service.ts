//acá podemos escribir funciones, llamar APIs, etc.
//la lógica general que se va a manejar en el código

import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
//Injectable hace que el servicio esté disponible desde la raíz de la app, para que
//pueda ser inyectado en otros componentes sin configuración extra
export class HeroService {
  //acepta una inyección de dependencia del servicio MessageService
  constructor(private messageService: MessageService) {}
  //permite al servicio HeroService usar métodos y props del servicio MessageServic

  //creo el método getHeroes para que me retorne un observable del array HEROES con objetos tipo Hero dentro
  //se usa la clase Observable para manejar los datos asincrónicos
  getHeroes(): Observable<Hero[]> {
    //of() es para crear un nuevo observable que emita el arreglo HEROES
    const heroes = of(HEROES);

    this.messageService.add('The HeroService Fetched the Heroes');
    return heroes;
  }
}
