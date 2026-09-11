import express from 'express';
import Router from 'express';
import { getAllUsers, addUser, getById, updateUser, deleteUser } from '../Controler/User_Control.js';
 

const router = Router();
userRouter.post("/", addUser);
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getById);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);


export default router;


