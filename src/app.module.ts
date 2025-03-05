import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { User, UserSchema } from './schemas/user.schema';
import { Movie, MovieSchema } from './schemas/movie.schema';
import { Booking, BookingSchema } from './schemas/booking.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI!), // Ensure you have a .env file with MONGO_URI
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Movie.name, schema: MovieSchema },
      { name: Booking.name, schema: BookingSchema },
    ]),
  ],
})
export class AppModule {}
