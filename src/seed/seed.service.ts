import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { PokeAPII } from './interfaces/poke-res.interface';

@Injectable()
export class SeedService {
  constructor(private readonly httpService: HttpService) {}

  async executeSeed() {
    const { data } = await firstValueFrom(
      this.httpService.get<PokeAPII>(
        'https://pokeapi.co/api/v2/pokemon?limit=9',
      ),
    );

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const id = segments[segments.length - 2];
      console.log(`Pokemon: ${name} - ID: ${id}`);
    });

    return data;
  }
}
