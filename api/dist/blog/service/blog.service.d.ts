import { Observable } from 'rxjs';
import { User } from 'src/user/models/user.interface';
import { UserService } from 'src/user/service/user.service';
import { Repository } from 'typeorm';
import { BlogEntryEntity } from '../model/blog_entry_entity';
import { BlogEntry } from '../model/blog_entry_interface';
export declare class BlogService {
    private readonly blogRepository;
    private userService;
    constructor(blogRepository: Repository<BlogEntryEntity>, userService: UserService);
    create(user: User, blogEntry: BlogEntry): Observable<BlogEntry>;
    findAll(): Observable<BlogEntry[]>;
    findByUser(userId: any): Observable<BlogEntry[]>;
    findOne(id: number): Observable<BlogEntry>;
    generateSlug(title: string): Observable<string>;
}
