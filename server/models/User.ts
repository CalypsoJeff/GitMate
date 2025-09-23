import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  login: string;
  name: string;
  location: string;
  blog: string;
  bio: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: Date;
  deleted?: boolean;
}

const UserSchema: Schema = new Schema(
  {
    login: { type: String, required: true, unique: true },
    name: String,
    location: String,
    blog: String,
    bio: String,
    public_repos: Number,
    public_gists: Number,
    followers: Number,
    following: Number,
    created_at: Date,
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
