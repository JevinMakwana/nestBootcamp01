import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {};

    // GET /users
    @Get()
    // findAll(@Query('role') role?:'INTERN' | 'ENGINEER' | 'ADMIN'){
    findAll(@Query('role') role?:string){
        return this.usersService.findAll(role);
    }

    // GET /users/:id
    @Get(':id')
    findOne(@Param('id') id:string){
        return this.usersService.findOne(+id);
    }

    // POST /users
    @Post()
    create(@Body(ValidationPipe) createUserDto:CreateUserDto){
        return this.usersService.create(createUserDto);
    }
    
    // PATCH /users/:id
    @Patch(':id')
    update(@Param('id') id:string, @Body(ValidationPipe) updateUSerDto:UpdateUserDto){
        return this.usersService.update(+id, updateUSerDto);
    }
    
    // DELETE /users/:id
    @Delete(':id')
    deleteOne(@Param('id') id:string){
        return this.usersService.delete(+id);
    }

}
