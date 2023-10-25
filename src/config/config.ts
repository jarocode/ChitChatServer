import dotenv from "dotenv";

dotenv.config();

const MONGO_DB_USERNAME = process.env.MONGODB_USERNAME || '';
const NODE_ENV = process.env.NODE_ENV || '';
const MONGO_DB_PASSWORD = process.env.MONGODB_PASSWORD || '';
const MONGO_URI = `mongodb+srv://${MONGO_DB_USERNAME}:${MONGO_DB_PASSWORD}cluster0.6j6ma.mongodb.net/?retryWrites=true&w=majority`

 const config ={
    mongoUri : MONGO_URI
}

export default config;