import express from "express";

const userRouter = express.Router();

userRouter.post("/signup", (req, res)=>{
    res.status(201).json({
        msg: "User created successfully"
    })
})

export default userRouter;