//acá podemos escribir funciones, llamar APIs, etc.
//la lógica general que se va a manejar en el código

import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
//Injectable hace que el servicio esté disponible desde la raíz de la app, para que
//pueda ser inyectado en otros componentes sin configuración extra
export class HeroService {
  private heroesUrl = 'api/heroes';
  httpOptions = {
    //cabecera Content-Type para indicar que el contenido del cuerpo enviará datos JSON
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  //acepta una inyección de dependencia del servicio MessageService
  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}
  //permite al servicio HeroService usar métodos y props del servicio MessageServic

  //método para agregar mensajes al servicio MessageService
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  //creo el método getHeroes para que me retorne un observable del array HEROES con objetos tipo Hero dentro
  //se usa la clase Observable para manejar los datos asincrónicos
  getHeroes(): Observable<Hero[]> {
    //se usa el método "get" de HttpClient
    //"pipe" es un método para encadenar operadores en observables, en este caso el "tap" y el "catchError"
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      //se usa tap para acciones secundarias en el flujo de datos del observable
      //o sea, para ejecutar código que no afecte el valor emitido del observ
      //en este caso agregar un mensaje en MessageService
      tap((_) => this.log('heroes listados')),
      //se utiliza el catchError para manejar los errores
      catchError(this.handleError<Hero[]>('error en getHeroes', []))
    );

    //of() es para crear un nuevo observable que emita el arreglo HEROES
    //const heroes = of(HEROES);
  }

  getHero(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.heroesUrl}/${id}`).pipe(
      tap((_) => this.log(`encontramos al héroe con id${id}`)),
      catchError(this.handleError<Hero>(`error en getHero id=${id}`))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((_) => this.log(`Actualizado el héroe con id ${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // si no hay nada buscado, se devuelve un arreglo vacío
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`resultados para "${term}"`)
          : this.log(`no se encontraron resultados para "${term}"`)
      ),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
}
