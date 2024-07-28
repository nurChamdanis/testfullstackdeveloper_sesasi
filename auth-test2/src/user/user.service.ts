import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/dto/CreateUser.dto';
import { hash } from 'bcrypt';
import { Prisma } from '@prisma/client';
import { UpdateUserDto } from './dto/dto/UpdateUser.dto';

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
    const user = await this.prisma.$queryRaw(Prisma.sql`
        SELECT 
          a.id,
          b.id_user,
          b.email,
          b.name,
          c.desc AS detail_type,
          c.id as id_type
        FROM detail_user a
        LEFT JOIN User b ON b.id = a.id_type
        LEFT JOIN Type_user c ON c.id = a.id_user
          where a.id=${id}
      `); 
    return user;
  }
  
  async findAllType(){
    return await this.prisma.type_user.findMany();
  }
  
  async findAll(id: number) {
    if (id === 0) {
      // Return all users if id is 0
      return await this.prisma.user.findMany();
    } else {
      // Return a specific user if id is greater than 0
      const user = await this.prisma.$queryRaw(Prisma.sql`
        SELECT 
          a.id as id,
          b.id as id_user,
          b.email,
          b.name,
          c.desc AS detail_type,
          c.id as id_type
        FROM detail_user a
        LEFT JOIN User b ON b.id = a.id_user
        LEFT JOIN Type_user c ON c.id = a.id_type
          where b.id=${id}
      `); 

      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      return user;
    }
  }

  async updateUser(dto: UpdateUserDto) {
    var result = {};
    const detail_user = await this.prisma.$queryRaw(Prisma.sql`
      select * 
      from detail_user 
      where id_type=${dto.id_type} and id_user=${dto.id_user}
      `);

    if (detail_user) throw new ConflictException('user find duplicated');

    try{
    const updates = await this.prisma.$queryRaw(Prisma.sql`
      update 
      set id_type=${dto.id_type}
      detail_user
      where id_user=${dto.id_user}`); 
      result = {status: 200, data: [], message: 'update success !'};
    }catch(error){
      result = {status: 400, data: [], message: 'update success !'};
    }
    return result;
  }
  // 
}
