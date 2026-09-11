const express = require('express'); 
const router = express.Router();
const User_Control = require("../Controler/User_Control");

router.post("/", User_Control.addUser);
router.get("/", User_Control.getAllUsers);
router.get("/:id", User_Control.getById);
router.put("/:id", User_Control.updateUser);
router.delete("/:id", User_Control.deleteUser);

module.exports = router;


