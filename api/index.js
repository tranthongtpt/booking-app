import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";

const app = express();
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("connect to mongodb");
    } catch (error) {
        throw error;
    }
}
mongoose.connection.on("disconnected",() =>{
    console.log("mongodb disconnected");
})
mongoose.connection.on("connected",() =>{
    console.log("mongodb connected");
})

//middlewares
app.use((err,req,res,next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success:true,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack,
    })
})

app.use(express.json())
app.use("/api/auth",authRoute);
app.use("/api/users",usersRoute);
app.use("/api/hotels",hotelsRoute);
app.use("/api/rooms",roomsRoute);

app.listen(8000, () =>{
    connect()
    console.log("connected to back.");
})
