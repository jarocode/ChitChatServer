import mongoose from "mongoose";
import config from "./config";
 
interface ConnectOptions{
    useNewUrlParser : boolean,
    useUnifiedTopology : boolean
 }

export const connectDB = async () => {
    try {
        const conn = mongoose.connect(config.mongoUri, {
            useNewUrlParser: true, useUnifiedTopology: true,
        })

        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}