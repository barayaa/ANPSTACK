import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors ,Request, Res } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { map, Observable, catchError, of, switchMap, tap } from 'rxjs';
import { hasRoles } from 'src/auth/decorator/roles.decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/role.guards';
import { UserRole } from '../models/user.entity';
import { User } from '../models/user.interface';
import { UserService } from '../service/user.service';
import {  FileInterceptor } from '@nestjs/platform-express';
import {diskStorage} from 'multer'
import path, { extname, join } from 'path';
import { UseerIsUser } from 'src/auth/guards/userIsUser-guard';


export const storage = {
    storage: diskStorage({
        destination: './uploads/profilesimages',
        filename: (req, file, cb) =>{
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
            return cb(null, `${randomName}${extname(file.originalname)}`)
        }
    })
}


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



    @UseGuards(JwtAuthGuard, UseerIsUser)
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
    updateUserRole(@Param('id') id: string, @Body() user: User): Observable<User> {
        return this.userService.updateRoleOfUser(Number(id), user)
    }

    @UseGuards(JwtAuthGuard)
    @Post('upload')
    @UseInterceptors(FileInterceptor('file' , storage))
    uploadfile(@UploadedFile() file, @Request() req): Observable<User> {
        const user: User = req.user.user;
        return this.userService.updateOne(user.id ,{profileImage: file.filename}).pipe(
            tap((user: User)=> console.log(user)),
            map((user: User) =>({
                profileImage: user.profileImage
            }))
        )
    }


    @Get('profile-image/:imagename')
        findProfileImage(@Param('imagename') imagename , @Res() res): Observable<Object> {
            return of(res.sendFile(join(process.cwd(), 'uploads/profilesimages/' + imagename)))
        }
    
   
}
 