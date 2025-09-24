import mongoose, { Document } from "mongoose";
export interface IUser extends Document {
    login: string;
    name: string;
    location: string;
    blog: string;
    bio: string;
    public_repos: number;
    public_gists: number;
    followers_count: number;
    following_count: number;
    followers_list?: string[];
    following_list?: string[];
    friends?: string[];
    created_at: Date;
    deleted?: boolean;
}
declare const _default: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=User.d.ts.map