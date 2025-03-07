// Ensure you have a .env file with MONGO_URI

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User, UserSchema } from './schemas/user.schema';
import { Movie, MovieSchema } from './schemas/movie.schema';
import { Booking, BookingSchema } from './schemas/booking.schema';
import { AuthModule } from './auth/auth.module';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      // eslint-disable-next-line @typescript-eslint/require-await
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
        dbName: 'movieBuddy',
      }),
      inject: [ConfigService],
    }), // Ensure you have a .env file with MONGO_URI
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Movie.name, schema: MovieSchema },
      { name: Booking.name, schema: BookingSchema },
    ]),
    AuthModule,
    MovieModule,
  ],
})
export class AppModule {}
