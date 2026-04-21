import mongoose from "mongoose";
const connectDb = async () => {
  try {
    const uri = process.env.MONGODB_URL;

    if (!uri) {
      throw new Error("❌ MONGODB_URL is not defined in .env file");
    }
    await mongoose.connect(uri);

    console.log("DB connected");
  } catch (error) {
    console.log("DB error:", error.message);
  }
};
export default connectDb;
