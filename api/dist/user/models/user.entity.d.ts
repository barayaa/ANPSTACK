import { BlogEntryEntity } from "src/blog/model/blog_entry_entity";
export declare enum UserRole {
    ADMIN = "admin",
    EDITOR = "editor",
    USER = "user"
}
export declare class UserEntity {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
    role: UserRole;
    profileImage: string;
    blogEntries: BlogEntryEntity[];
    emailToLowerCase(): void;
}
