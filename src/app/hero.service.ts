//acá podemos escribir funciones, llamar APIs, etc.
//la lógica general que se va a manejar en el código

import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable({
  providedIn: 'root',
})
//Injectable hace que el servicio esté disponible desde la raíz de la app, para que
//pueda ser inyectado en otros componentes sin configuración extra
export class HeroService {
  constructor() {}

  //creo el método getHeroes para que me retorne el array HEROES con objetos tipo Hero dentro
  getHeroes(): Hero[] {
    return HEROES;
  }
}
