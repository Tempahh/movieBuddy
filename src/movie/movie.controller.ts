import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Movie, MovieDocument } from 'src/schemas/movie.schema';
import { MovieService } from './movie.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('/')
  async getAllMovies(): Promise<Movie[]> {
    return this.movieService.getAllMovies();
  }

  @Get(':id')
  async getMovieById(id: string): Promise<Movie> {
    return this.movieService.getMovieById(id);
  }

  @Post('create')
  //@UseGuards(JwtAuthGuard)
  async createMovie(@Body() movie: MovieDocument): Promise<MovieDocument> {
    return this.movieService.createMovie(movie);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateMovie(id: string, @Body() movie: Movie): Promise<Movie> {
    return this.movieService.updateMovie(id, movie);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteMovie(id: string): Promise<Movie> {
    return this.movieService.deleteMovie(id);
  }
}
