import { BlogEntry } from "src/blog/model/blog_entry_interface";
import { UserRole } from "./user.entity";
export interface User {
    id?: number;
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    role?: UserRole;
    profileImage?: string;
    blogEntries?: BlogEntry[];
}
