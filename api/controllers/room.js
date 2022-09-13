import Room from "../models/Room";
import Hotel from "../models/Hotel";
import { createError } from "../utils/error";

export const createRoom = async(req, res, next) => {
    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body)

    try {
        const savedRooom = await Room.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId,{ $push:{rooms:savedRooom._id},
            })
        } catch (err) {
            next(err)
        }
        res.status(200).json(savedRooom)
    } catch (err) {
        next(err);
    }
}
export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        })
        res.status(200).json(updatedRoom);
    } catch (err) {
        next(err);
    }
}
export const deleteRoom = async (req, res, next) => {
    try {
        await Room.findByIdAndDelete(req.params.id);
        res.status(200).json("Room has been deleted");
    } catch (err) {
        next(err);
    }
}
export const getRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id);
        res.status(200).json(room);
    } catch (err) {
        next(err);
    }
}
export const getRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (err) {
        next(err);
    }
}