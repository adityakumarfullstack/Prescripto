import mongoose from "mongoose";

const connectDB = async () => {
    try {
      
    // mongoose.connection.on("connected", () => {
    //   console.log("MongoDB connection established");
    // });

    // mongoose.connection.on("disconnected", () => {
    //   console.log("MongoDB connection disconnected");
    // });

    // mongoose.connection.on("error", (error) => {
    //   console.error("MongoDB connection error:", error);
    // });

    await mongoose.connect(process.env.MONGODB_URI);
      
    console.log("MongoDB connected successfully");
    console.log(`Host: ${mongoose.connection.host}`);
    console.log(`Database: ${mongoose.connection.name}`);
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;