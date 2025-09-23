import { Router } from "express";
import {
  saveGitHubUser,
  searchUsers,
  updateUser,
  softDeleteUser,
  listUsers,
} from "../controllers/userController.js";
import { validateBody } from "../middlewares/validate.js";
import { updateUserSchema } from "../validation/userValidation.js";

const router = Router();

// POST: Save GitHub user
router.post("/:username", saveGitHubUser);

// GET: Search users (query params: username, location)
router.get("/search", searchUsers);

// PUT: Update user fields
router.put("/:username", validateBody(updateUserSchema), updateUser);

// DELETE: Soft delete user
router.delete("/:username", softDeleteUser);

// GET: List users sorted
router.get("/", listUsers);

export default router;
