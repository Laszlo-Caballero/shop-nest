import { PrismaService } from '@/common/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { compare, hash } from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, name, password } = registerDto;

    const findEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (findEmail) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        name,
        password: hashPassword,
      },
    });

    return user;
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const payload = {
      userId: user.userId,
      role: user.role,
    };

    const token = this.jwtService.sign(payload);

    return {
      data: user,
      token,
    };
  }
}
