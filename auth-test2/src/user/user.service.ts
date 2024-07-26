import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/dto/user.dto';
import { hash } from 'bcrypt';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (user) throw new ConflictException('email duplicated');

    const newUser = await this.prisma.user.create({
      data: {
        ...dto,
        password: await hash(dto.password, 10),
      },
    });
    
    const new_detail = await this.prisma.detail_user.create({
      data: {
        id_type: "",
        id_user: (newUser.id).toFixed()
      }
    });

    const { password, ...result } = newUser;
    return result;
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }
  async findById(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }
  async findAll(id: number) {
    if (id === 0) {
      // Return all users if id is 0
      return await this.prisma.user.findMany();
    } else {
      // Return a specific user if id is greater than 0
      const user = await this.prisma.$queryRaw(Prisma.sql`
        SELECT 
          b.id,
          b.email,
          b.name,
          c.desc AS detail_type,
          c.id as id_type
        FROM detail_user a
        LEFT JOIN User b ON b.id = a.id_type
        LEFT JOIN Type_user c ON c.id = a.id_user
          where a.id=${id}
      `); 

      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      return user;
    }
  }
}
