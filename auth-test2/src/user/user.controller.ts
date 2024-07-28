import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard'; 
import { UpdateUserDto } from './dto/dto/UpdateTypeUser.dto'; 

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
  
  @Get('/type/all')
  async getAllTypeUser() {
    return await this.userService.findAllType();
  }

  @Post('/update')
  async registerUser(@Body() dto: UpdateUserDto) {
    return await this.userService.updateUser(dto);
  }


}
