const express = require('express');
const router = express.Router();
// const { UserModel } = require("../Schema/UserSchema");
const { Register, GetAllData, GetOneData, UpdateData, DeleteData } = require('../Controller/UserController');

router.post("/register",Register);
router.get("/getData",GetAllData);
router.get("/getOneData/:id",GetOneData);
router.put("/UpdateData/:id",UpdateData);
router.delete("/DeleteData/:id",DeleteData);
module.exports = router;


