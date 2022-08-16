import { User } from '../models/user.interface';
export declare class UserService {
    private userService;
    constructor(userService: UserService);
    creat(user: User): any;
    findAll(): any;
}
