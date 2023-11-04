import mongoose from 'mongoose';

// interface ConnectOptions{
//     useNewUrlParser : boolean,
//     useUnifiedTopology : boolean
//  }

export const connectDB = async () => {
  try {
    // const conn = await mongoose.connect(config.mongoUri);
    const conn = await mongoose.connect(process.env.MONGO_URI || '', {
      dbName: process.env.MONGODB_DATABASE_NAME
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
