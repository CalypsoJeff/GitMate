import type { Request, Response } from "express";
import axios from "axios";
import User from "../models/User.js";

// 1. Save GitHub User
export const saveGitHubUser = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;

    // check in DB first
    let user = await User.findOne({ login: username });
    if (user) return res.json(user);

    // fetch from GitHub
    try {
      const { data } = await axios.get(
        `https://api.github.com/users/${username}`
      );
      user = await User.create(data);
      return res.json(user);
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        return res
          .status(404)
          .json({ message: `GitHub user "${username}" not found` });
      }
      throw err; // other errors go to outer catch
    }
  } catch (error) {
    res.status(500).json({ message: "Error saving GitHub user", error });
  }
};

// 2. Search users
export const searchUsers = async (req: Request, res: Response) => {
  try {
    const { username, location, blog, bio } = req.query;
    const query: any = { deleted: { $ne: true } }; // exclude soft-deleted users

    if (username) query.login = new RegExp(username as string, "i"); // case-insensitive search
    if (location) query.location = new RegExp(location as string, "i");
    if (blog) query.blog = new RegExp(blog as string, "i");
    if (bio) query.bio = new RegExp(bio as string, "i");

    const users = await User.find(query);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error searching users", error });
  }
};

// 3. Update fields
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const updates = req.body;
    const user = await User.findOneAndUpdate({ login: username }, updates, {
      new: true,
    });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

// 4. Soft delete user
export const softDeleteUser = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const user = await User.findOneAndUpdate(
      { login: username },
      { deleted: true },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User soft deleted", user });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

// 5. List users sorted
export const listUsers = async (req: Request, res: Response) => {
  try {
    const { sortBy, order } = req.query;
    const sortField = (sortBy as string) || "created_at";
    const sortOrder = order === "desc" ? -1 : 1; // default asc

    const users = await User.find({ deleted: { $ne: true } }).sort({
      [sortField]: sortOrder,
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error listing users", error });
  }
};

export const getRepos = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    let user = await User.findOne({ login: username });

    if (!user) {
      // fetch & save user first
      const { data } = await axios.get(
        `https://api.github.com/users/${username}`
      );
      user = await User.create(data);
    }

    // fetch repos from GitHub
    const { data: repos } = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );
    res.json(repos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching repos", error });
  }
};

export const getFollowers = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    let user = await User.findOne({ login: username });

    if (!user) {
      // fetch & save user first
      const { data } = await axios.get(
        `https://api.github.com/users/${username}`
      );
      user = await User.create(data);
    }

    // fetch followers from GitHub
    const { data: followers } = await axios.get(
      `https://api.github.com/users/${username}/followers`
    );
    res.json(followers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching followers", error });
  }
};

export const getFriends = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;

    let user = await User.findOne({ login: username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If already have friends cached in DB
    if (user.friends && user.friends.length > 0) {
      return res.json(user.friends);
    }

    // Fetch from GitHub
    const { data: followers } = await axios.get(
      `https://api.github.com/users/${username}/followers`
    );
    const { data: following } = await axios.get(
      `https://api.github.com/users/${username}/following`
    );

    const followerLogins = new Set(followers.map((f: any) => f.login));
    const friends = following
      .filter((f: any) => followerLogins.has(f.login))
      .map((f: any) => f.login);

    // Save into DB
    user.followers_list = followers.map((f: any) => f.login);
    user.following_list = following.map((f: any) => f.login);
    user.friends = friends;
    user.followers_count = followers.length;
    user.following_count = following.length;
    await user.save();

    res.json(friends);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching friends", error });
  }
};
