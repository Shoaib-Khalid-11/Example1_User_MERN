import mongoose from "mongoose";
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string, {
      dbName: "example1",
    });
    console.log(`Database connected successfully ${process.env.MONGO_URI}`);
  } catch (error) {
    console.log(error);
  }
};
export default dbConnection;
