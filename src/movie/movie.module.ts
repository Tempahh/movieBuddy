import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from '../schemas/movie.schema';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
    AuthModule,
  ],
  providers: [MovieService],
  controllers: [MovieController],
})
export class MovieModule {}
