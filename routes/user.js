import express from "express";
import {
  register,
  login,
  getUserById,
  updateUser,
  updateRole,
  deleteUser,
  logout,
} from "../Controllers/user.js";

const user = express.Router();
user.post("/register", register);
user.post("/login", login);
user.get("/:id", getUserById);
user.put("/update", updateUser);
user.post("/logout", logout);
user.put("/updateRole", updateRole);
user.delete("/delete", deleteUser);

export default user;
