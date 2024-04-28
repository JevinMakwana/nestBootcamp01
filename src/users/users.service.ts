import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'INTERN' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'INTERN' },
        { id: 3, name: 'Alice Johnson', email: 'alice@example.com', role: 'ENGINEER' },
        { id: 4, name: 'Bob Brown', email: 'bob@example.com', role: 'ENGINEER' },
        { id: 5, name: 'Emily Davis', email: 'emily@example.com', role: 'ADMIN' }
    ];
    
    // findAll(role?:'INTERN' | 'ENGINEER' | 'ADMIN'){
    findAll(role?:string){
        if(role){
            const usersWithRoleX = this.users.filter(user => user.role === role);
            if(!usersWithRoleX.length) throw new NotFoundException('User not found');
            return usersWithRoleX;
        }
        return this.users;
    }

    findOne(id:number){
        const user = this.users.find(user => user.id === id);
        if(!user) throw new NotFoundException('User not found');
        return user;
    }
    
    create(createUSerDto:CreateUserDto){
        const generatedId:number = [...this.users].sort((a,b) => b.id - a.id)[0].id + 1
        const newUser = {
            id:generatedId, 
            ...createUSerDto
        }
        this.users.push(newUser);
        return this.findAll();
    }

    update(id:number, updateUserDto:UpdateUserDto){
        this.users = this.users.map((user)=> {
            if(user.id === id){
                return {...user, ...updateUserDto};
            }
            return user;
        })

        return this.findOne(id);
    }

    delete(id:number){
        const removeUser = this.findOne(id);
        if(!removeUser) return 'Invalid Id'
        this.users = this.users.filter((user) => user.id !== removeUser.id);
        return removeUser;
    }
}
