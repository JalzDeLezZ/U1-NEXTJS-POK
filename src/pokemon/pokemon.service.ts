import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `Pokemon already exists - ${JSON.stringify(error.keyValue)}`,
        );
      }
      throw new InternalServerErrorException(
        `Can't create pokemon - ${error.message}`,
      );
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {
    console.log('🚀 ~ PokemonService ~ findOne ~ term:', term);

    let pokemon: Pokemon;

    //find by term
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    }
    //find by MongoID
    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }

    //find by name
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({
        name: term.toLowerCase().trim(),
      });
    }

    if (!pokemon) throw new NotFoundException(`Pokemon not found`);

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);

    if (updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();

    await pokemon.updateOne(updatePokemonDto);
    //return await pokemon.updateOne(updatePokemonDto, { new: true }); //not working
    return {
      ...pokemon.toJSON(),
      ...updatePokemonDto,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
