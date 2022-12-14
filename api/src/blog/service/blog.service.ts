import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { User } from 'src/user/models/user.interface';
import { UserService } from 'src/user/service/user.service';
import { Repository } from 'typeorm';
import { BlogEntryEntity } from '../model/blog_entry_entity';
import { BlogEntry } from '../model/blog_entry_interface';
const slugify = require('slugify');

@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(BlogEntryEntity) private readonly blogRepository: Repository<BlogEntryEntity>,
        private userService: UserService
    ) { }


    create(user: User, blogEntry: BlogEntry): Observable<BlogEntry> {
        blogEntry.author = user;
        return this.generateSlug(blogEntry.title).pipe(
            switchMap((slug: string) => {
                blogEntry.slug = slug;
                return from(this.blogRepository.save(blogEntry))
            })
        )
    }

    findAll(): Observable<BlogEntry[]> {
        return from(this.blogRepository.find({
            relations: ['author']
        }))
    }

    findByUser(userId: any): Observable<BlogEntry[]> {
        return from(this.blogRepository.find({ where: { author: userId }, relations: ['author'] })).pipe(
            map((blogEntries: BlogEntry[]) => blogEntries)
        )
    }

    findOne(id: number): Observable<BlogEntry> {
        return from(this.blogRepository.findOne({where : {id}, relations: ['author']})).pipe(
            map((blog: BlogEntry) => {
                console.log(blog);
                
                return blog
            })
        )
    }
    generateSlug(title: string): Observable<string> {
        return of(slugify(title))
    }

   
}
