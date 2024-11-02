import mongoose from "mongoose";

export let dbconnection = async () => {
  let dbConnect = await mongoose.connect(process.env.MONGO_URI);
  if (dbConnect) {
    console.log("db connected succesfully");
  } else {
    console.log("db is not connected succesfully");
  }
};


