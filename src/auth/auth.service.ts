import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  // Implement the methods for authentication
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(userDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const newUser = new this.userModel({
      ...userDto,
      password: hashedPassword,
    });
    await newUser.save();
    return this.generateToken(newUser);
  }

  async login(userDto: RegisterDto) {
    const user = await this.userModel.findOne({ email: userDto.email });
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordValid = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    return this.generateToken(user);
  }

  private generateToken(user: UserDocument) {
    const payload = { username: user.username, sub: user._id };
    return this.jwtService.sign(payload);
  }
}
