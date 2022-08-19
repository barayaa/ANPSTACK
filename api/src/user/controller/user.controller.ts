import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { map, Observable, catchError, of } from 'rxjs';
import { hasRoles } from 'src/auth/decorator/roles.decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/role.guards';
import { UserRole } from '../models/user.entity';
import { User } from '../models/user.interface';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }


    @Post()
    create(@Body() user: User): Observable<User | Object> {
        return this.userService.create(user).pipe(
            map((user: User) => user),
            catchError(err => of({ error: err.message }))
        )
    }


    @Post('login')
    login(@Body() user: User): Observable<Object> {
        return this.userService.login(user).pipe(
            map((jwt: string) => {
                return {
                    acces_token: jwt
                }
            })
        )
    }
   
    // @Get()
    // index(
    //     @Query('page') page: number = 1,
    //     @Query('limit') limit: number = 10,
    //     @Query('username') username: string
    //     ): Observable<Pagination<User>> {
    //     limit = limit > 100 ? 100 : limit;
    //     console.log(username);
        
    //     return this.userService.paginate({page: Number(page), limit: Number(limit), route: 'http://localhost:3000/api/user'})
    // }

    @Get()
    index(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('username') username: string
    ): Observable<Pagination<User>> {
        limit = limit > 100 ? 100 : limit;

        if (username === null || username === undefined) {
            return this.userService.paginate({ page: Number(page), limit: Number(limit), route: 'http://localhost:3000/api/user' });
        } else {
            return this.userService.paginateFilterByUsername(
                { page: Number(page), limit: Number(limit), route: 'http://localhost:3000/api/users' },
                username
            )
        }
    }



    @Get(':id')
    getById(@Param() param): Observable<User> {
        return this.userService.findOne(param.id)
    }


    @Put(':id')
    update(@Param('id') id: string, @Body() user: User): Observable<any> {
        return this.userService.updateOne(Number(id), user)
    }

    @Delete(':id')
    delete(@Param('id') id: string): Observable<User> {
        return this.userService.deleteOne(Number(id))
    }

    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id/role')
    updateUserRole(@Param('id')id: string , @Body() user: User): Observable<User>{
        return this.userService.updateRoleOfUser(Number(id), user)
    }
}
