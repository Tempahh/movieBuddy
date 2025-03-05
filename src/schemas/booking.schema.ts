import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type BookingDocument = HydratedDocument<Booking>;

@Schema({ timestamps: true })
export class Booking {
  // The Booking schema defines the structure of the booking document stored in the database. The schema consists of the following fields:
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Movie', required: true })
  movie: Types.ObjectId;

  @Prop({ required: true })
  showtime: Date;

  @Prop({ required: true })
  seats: number;

  @Prop({ default: 'pending', enum: ['pending', 'confirmed', 'cancelled'] })
  status: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
