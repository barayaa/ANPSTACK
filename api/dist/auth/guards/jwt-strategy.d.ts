import { ConfigService } from '@nestjs/config';
import { User } from 'src/user/models/user.interface';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(user: User): {
        user: User;
    };
}
export {};
