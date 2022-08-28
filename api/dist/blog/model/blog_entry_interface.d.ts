import { User } from "src/user/models/user.interface";
export interface BlogEntry {
    id?: number;
    title?: string;
    slug?: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
    likes?: number;
    author?: User;
}
