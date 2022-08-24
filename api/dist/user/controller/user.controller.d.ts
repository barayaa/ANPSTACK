import { Pagination } from 'nestjs-typeorm-paginate';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';
import { UserService } from '../service/user.service';
export declare const storage: {
    storage: import("multer").StorageEngine;
};
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    create(user: User): Observable<User | Object>;
    login(user: User): Observable<Object>;
    index(page: number, limit: number, username: string): Observable<Pagination<User>>;
    getById(param: any): Observable<User>;
    update(id: string, user: User): Observable<any>;
    delete(id: string): Observable<User>;
    updateUserRole(id: string, user: User): Observable<User>;
    uploadfile(file: any, req: any): Observable<User>;
    findProfileImage(imagename: any, res: any): Observable<Object>;
}
