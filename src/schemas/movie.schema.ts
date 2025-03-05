import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MovieDocument = HydratedDocument<Movie>;

@Schema({ timestamps: true })
export class Movie {
  //title, description, duration, genres, releaseDate, and cast
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  duration: number; // in minutes

  @Prop([String])
  genres: string[];

  @Prop()
  releaseDate: Date;

  @Prop([String])
  cast: string[];
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
// The Movie schema defines the structure of the movie document stored in the database. The schema consists of the following fields:
