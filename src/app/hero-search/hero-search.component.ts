import { Component } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
})
export class HeroSearchComponent {
  //prop observable que almacena héroes buscados
  //"$" se usa para indicar que la prop es observable
  heroes$!: Observable<Hero[]>;
  //instancia de la clase Subcject<String>, utilizada para emitir términos de búsqueda
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  // método, toma el término de búsqueda y lo emite en el "Subject" de "searchTerms"
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      //espera 300ms después de cada tecla apretada, para no hacer llamadas excesivas a la api
      debounceTime(300),

      // evita nuevas búsquedas si el térm actual es igual al anterior
      distinctUntilChanged(),

      // cambiar a un nuevo observable cada vez que el térm cambia
      switchMap((term: string) => this.heroService.searchHeroes(term))
    );
  }
}
