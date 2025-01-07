import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { PokeAPII } from './interfaces/poke-res.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectModel(Pokemon.name) private pokemonModel: Model<Pokemon>,
    private readonly httpService: HttpService,
    private readonly axiosAdapter: AxiosAdapter //? custom http adapter
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany({}).exec();

    const { data } = await firstValueFrom(
      this.httpService
        .get<PokeAPII>('https://pokeapi.co/api/v2/pokemon?limit=174')
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );

    //!1 const insertPromisesArray = [];
    const pokToInsert: {
      name: string;
      no: number;
    }[] = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const id = +segments[segments.length - 2];

      //const poke = await this.pokemonModel.create({ name, no: id });
      //! 1 insertPromisesArray.push(this.pokemonModel.create({ name, no: id }));
      pokToInsert.push({ name, no: id });
    });

    //await Promise.all(insertPromisesArray);

    this.pokemonModel.insertMany(pokToInsert);

    return 'Seed executed';
  }
}
