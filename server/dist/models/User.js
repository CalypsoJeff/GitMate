import mongoose, { Schema, Document } from "mongoose";
const UserSchema = new Schema({
    login: { type: String, required: true, unique: true },
    name: String,
    location: String,
    blog: String,
    bio: String,
    public_repos: Number,
    public_gists: Number,
    followers_count: Number,
    following_count: Number,
    followers_list: [String],
    following_list: [String],
    friends: [String],
    created_at: Date,
    deleted: { type: Boolean, default: false },
}, { timestamps: true });
export default mongoose.model("User", UserSchema);
//# sourceMappingURL=User.js.map