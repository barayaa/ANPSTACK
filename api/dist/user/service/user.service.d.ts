import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/services/auth.service';
import { Repository } from 'typeorm';
import { UserEntity, UserRole } from '../models/user.entity';
import { User } from '../models/user.interface';
import { Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
export declare class UserService {
    private readonly userRepository;
    private authService;
    constructor(userRepository: Repository<UserEntity>, authService: AuthService);
    create(user: User): Observable<User>;
    paginate(options: IPaginationOptions): Observable<Pagination<User>>;
    paginateFilterByUsername(options: IPaginationOptions, username: string): Observable<Pagination<User>>;
    findAll(): Observable<User[]>;
    findOne(id: number): Observable<User>;
    updateOne(id: number, user: User): Observable<User>;
    updateRoleOfUser(id: number, user: User): Observable<any>;
    deleteOne(id: number): Observable<any>;
    login(user: User): Observable<string>;
    validateUser(email: string, password: string): Observable<{
        id?: number;
        name?: string;
        username?: string;
        email?: string;
        role?: UserRole;
        profileImage?: string;
        blogEntries?: import("../../blog/model/blog_entry_interface").BlogEntry[];
    }>;
    findByEmail(email: string): Observable<any>;
}
