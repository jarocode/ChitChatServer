import mongoose from 'mongoose';

// interface ConnectOptions{
//     useNewUrlParser : boolean,
//     useUnifiedTopology : boolean
//  }

export const connectDB = async () => {
  try {
    // const conn = await mongoose.connect(config.mongoUri);
    const conn = await mongoose.connect(
      'mongodb+srv://jaros:xDRPC5eagyZ3v2hc@cluster0.6j6ma.mongodb.net/?retryWrites=true&w=majority'
    );

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
