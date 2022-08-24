import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from, switchMap, map, catchError, throwError,  } from 'rxjs';
import { AuthService } from 'src/auth/services/auth.service';
import { Like, Repository } from 'typeorm';
import { UserEntity, UserRole } from '../models/user.entity';
import { User } from '../models/user.interface';
import {paginate,Pagination,IPaginationOptions} from 'nestjs-typeorm-paginate';
  
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        private authService: AuthService
    ) { }

    create(user: User): Observable<User> {
        return this.authService.hashPassword(user.password).pipe(
            switchMap((passwordHash: string) => {
                const newUser = new UserEntity
                newUser.name = user.name
                newUser.username = user.username
                newUser.email = user.email
                newUser.password = passwordHash
                newUser.role = UserRole.USER

                return from(this.userRepository.save(newUser)).pipe(
                    map((user: User) => {
                        const { password, ...result} = user
                        return result
                    }),
                    catchError(err => throwError(err))
                )
            })
        )
    }

    paginate(options: IPaginationOptions): Observable<Pagination<User>>{
        return from(paginate<User>(this.userRepository, options)).pipe(
            map((userPageable: Pagination<User>) =>{
                userPageable.items.forEach(function (v) {delete v.password});
                return userPageable
            })
        )
    }


    paginateFilterByUsername(options: IPaginationOptions, username: string): Observable<Pagination<User>>{
        return from(paginate<User>(this.userRepository, options, {where: {username: Like(`%${username}%`)}})).pipe(
            map((userPageable: Pagination<User>) =>{
                userPageable.items.forEach(function (v) {delete v.password});
                return userPageable
            })
        )
    }




    findAll(): Observable<User[]> {
        return from(this.userRepository.find()).pipe(
            map((users: User[]) =>{
                users.forEach(function(v) {delete v.password})
                return users
            })
        )
    }

    findOne(id: number): Observable<User> {
        return from(this.userRepository.findOne({ where: { id } })).pipe(
            map((user: User) => {
              //  console.log(user);
                const { password, ...result } = user
                return result
            })
        )
    }

    updateOne(id: number, user: User): Observable<User> {
        delete user.email
        delete user.password
        delete user.role
        return from(this.userRepository.update(id, user)).pipe(
            switchMap(()=> this.findOne(id))
        )
    }


    updateRoleOfUser(id: number, user: User): Observable<any> {
        return from(this.userRepository.update(id, user))
    }

    deleteOne(id: number): Observable<any> {
        return from(this.userRepository.delete(id))
    }

    login(user: User){
        return this.validateUser(user.email , user.password).pipe(
            switchMap((user: User) =>{
                if(user){
                    return this.authService.generateJwt(user).pipe(
                        map((jwt: string) => jwt)
                    )
                }else{
                    return 'wrong Password'
                }
            })
        )
    }

    validateUser(email: string , password: string){
        return this.findByEmail(email).pipe(
            switchMap((user: User) => this.authService.comparePassword(password, user.password).pipe(
                map((match : boolean) =>{
                    if(match) {
                        const {password, ...result } = user
                        return result
                    }else{
                         throw Error
                    }
                })
            ))
        )
    }

    findByEmail(email: string): Observable<any>{
        return from(this.userRepository.findOne({where: {email: email}}))
    }
}
