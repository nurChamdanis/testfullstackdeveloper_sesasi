import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreateUserDto } from './dto/dto/CreateUser.dto';
import { UpdateUserDto } from './dto/dto/UpdateUser.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get(':id')
  async getUserProfile(@Param('id') id: number) {
    return await this.userService.findById(id);
  }

  @Get('/all/:id')
  async getAllUser(@Param('id') id: number) {
    return await this.userService.findAll(id);
  }
  
  @Get('/type/all/:id')
  async getAllTypeUser(@Param('id') id: number) {
    return await this.userService.findAllType(id);
  }

  @Post('user/update')
  async registerUser(@Body() dto: UpdateUserDto) {
    return await this.userService.updateUser(dto);
  }


}
