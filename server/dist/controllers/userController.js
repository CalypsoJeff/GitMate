import axios from "axios";
import User from "../models/User.js";
// 1. Save GitHub User
export const saveGitHubUser = async (req, res) => {
    try {
        const { username } = req.params;
        let user = await User.findOne({ login: username });
        if (!user) {
            const { data } = await axios.get(`https://api.github.com/users/${username}`);
            user = await User.create(data);
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Error saving GitHub user", error });
    }
};
// 2. Search users
export const searchUsers = async (req, res) => {
    try {
        const { username, location } = req.query;
        const query = {};
        if (username)
            query.login = new RegExp(username, "i");
        if (location)
            query.location = new RegExp(location, "i");
        const users = await User.find(query);
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Error searching users", error });
    }
};
// 3. Update fields
export const updateUser = async (req, res) => {
    try {
        const { username } = req.params;
        const updates = req.body;
        const user = await User.findOneAndUpdate({ login: username }, updates, {
            new: true,
        });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
};
// 4. Soft delete user
export const softDeleteUser = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOneAndUpdate({ login: username }, { deleted: true }, { new: true });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.json({ message: "User soft deleted", user });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
};
// 5. List users sorted
export const listUsers = async (req, res) => {
    try {
        const { sortBy } = req.query;
        const sortField = sortBy || "created_at";
        const users = await User.find({ deleted: { $ne: true } }).sort({
            [sortField]: 1,
        });
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Error listing users", error });
    }
};
//# sourceMappingURL=userController.js.map