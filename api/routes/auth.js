import express from "express";

const router = express.Router();

router.get("/register", (req, res) => {
    res.send("Welcome auth")
})

export default router