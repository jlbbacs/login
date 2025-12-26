import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(
      `🟢 MongoDB Connected: ${conn.connection.host}`
    );
    console.log("Using URI:", process.env.MONGO_URI);

  } catch (error) {
    console.error(
      `🔴 MongoDB Connection Error: ${error.message}`
    );
    process.exit(1);
  }
};
