import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to the db success");
  } catch (error) {
    console.error("Error connecting to database");
    process.exit(1);
  }
};

export default connectToDB;
