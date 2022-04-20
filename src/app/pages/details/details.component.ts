import { PokeApiService } from './../../service/poke-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private pokeApiService: PokeApiService
  ) {}

  private urlPokemon: string = 'http://pokeapi.co/api/v2/pokemon';
  private urlName: string = 'http://pokeapi.co/api/v2/pokemon-species';
  public pokemon: any;
  public isLoading: boolean = false;

  ngOnInit(): void {
    this.getPokemon;
  }

  get getPokemon() {
    const id = this.activatedRoute.snapshot.params['id'];
    const pokemon = this.pokeApiService.apiGetPokemon(
      `${this.urlPokemon}/${id}`
    );
    const name = this.pokeApiService.apiGetPokemon(`${this.urlName}/${id}`);

    return forkJoin([pokemon, name]).subscribe((res) => {
      this.pokemon = res;
      this.isLoading = true;
    });
  }
}
