import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { User } from 'src/user/models/user.interface';
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    generateJwt(user: User): Observable<string>;
    hashPassword(password: string): Observable<string>;
    comparePassword(newPassword: string, passwordHash: string): Observable<any | boolean>;
}
