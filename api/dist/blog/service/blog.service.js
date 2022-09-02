"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const rxjs_1 = require("rxjs");
const user_service_1 = require("../../user/service/user.service");
const typeorm_2 = require("typeorm");
const blog_entry_entity_1 = require("../model/blog_entry_entity");
const slugify = require('slugify');
let BlogService = class BlogService {
    constructor(blogRepository, userService) {
        this.blogRepository = blogRepository;
        this.userService = userService;
    }
    create(user, blogEntry) {
        blogEntry.author = user;
        return this.generateSlug(blogEntry.title).pipe((0, rxjs_1.switchMap)((slug) => {
            blogEntry.slug = slug;
            return (0, rxjs_1.from)(this.blogRepository.save(blogEntry));
        }));
    }
    findAll() {
        return (0, rxjs_1.from)(this.blogRepository.find({
            relations: ['author']
        }));
    }
    findByUser(userId) {
        return (0, rxjs_1.from)(this.blogRepository.find({ where: { author: userId }, relations: ['author'] })).pipe((0, rxjs_1.map)((blogEntries) => blogEntries));
    }
    findOne(id) {
        return (0, rxjs_1.from)(this.blogRepository.findOne({ where: { id }, relations: ['author'] })).pipe((0, rxjs_1.map)((blog) => {
            console.log(blog);
            return blog;
        }));
    }
    generateSlug(title) {
        return (0, rxjs_1.of)(slugify(title));
    }
};
BlogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(blog_entry_entity_1.BlogEntryEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_service_1.UserService])
], BlogService);
exports.BlogService = BlogService;
//# sourceMappingURL=blog.service.js.map