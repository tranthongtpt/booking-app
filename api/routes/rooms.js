import express from "express";
import { createRoom } from "../controllers/room";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/", verifyAdmin,createRoom);
//UPDATE
router.put("/:id",verifyAdmin,updateRoom)
//DELETE
router.delete("/:id",verifyAdmin,deleteRoom)
//GET
router.get("/:id",getRoom)
//GET ALL
router.get("/",getRooms)

export default router