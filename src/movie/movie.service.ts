import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie, MovieDocument } from 'src/schemas/movie.schema';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
  ) {}

  async getAllMovies(): Promise<Movie[]> {
    return await this.movieModel.find().exec();
  }

  async getMovieById(id: string): Promise<MovieDocument> {
    const movie = await this.movieModel.findById(id).exec();
    if (!movie) {
      throw new Error('Movie not found');
    }
    return movie;
  }

  async createMovie(movie: Movie): Promise<MovieDocument> {
    const newMovie = new this.movieModel(movie);
    return await newMovie.save();
  }

  async updateMovie(id: string, movie: Movie): Promise<MovieDocument> {
    const updatedMovie = await this.movieModel
      .findByIdAndUpdate(id, movie, { new: true })
      .exec();
    if (!updatedMovie) {
      throw new Error('Movie not found');
    }
    return updatedMovie;
  }

  async deleteMovie(id: string): Promise<MovieDocument> {
    const deletedMovie = await this.movieModel.findByIdAndDelete(id).exec();
    if (!deletedMovie) {
      throw new Error('Movie not found');
    }
    return deletedMovie;
  }
}
