import mongoose  from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://geetanehakalangi:Girija1986@cluster0.khwxup7.mongodb.net/food-del');
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;