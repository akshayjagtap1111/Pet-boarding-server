const { append } = require("express/lib/response");

const express = require("express");

const router = express.Router();

const { userRegister, userLogin ,checkRole,serilizeUser,userAuth} =require("../utils/Auth")

router.get("/", async (req, res) => {
  res.send("data");
});

router.post("/resister",async (req,res)=>{
   await userRegister(req.body,"user",res)
})

router.post("/resister-admin", async (req,res)=>{
    await userRegister(req.body,"admin",res)
})

router.post("/login",async (req,res)=>{
    await userLogin(req.body,"user",res)
})

router.post("/login-admin",async (req,res)=>{
    await userLogin(req.body,"admin",res)
})

router.get("/profile", userAuth, async (req,res)=>{

    return res.json(serilizeUser(req.user));

})

module.exports = router;
