import { Observable } from 'rxjs';
import { BlogEntry } from '../model/blog_entry_interface';
import { BlogService } from '../service/blog.service';
export declare class BlogController {
    private blogService;
    constructor(blogService: BlogService);
    create(blogEntry: BlogEntry, req: any): Observable<BlogEntry>;
    findBlogEntries(userId: any): Observable<BlogEntry[]>;
    findOne(id: number): Observable<BlogEntry>;
}
