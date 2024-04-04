import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.error("MongoDb Connected Succesfully");
    });

    connection.on("error", (err) => {
      console.error("MongoDb Connection Error", err);
      process.exit();
    });
  } catch (error) {
    console.log("error:", error);
    console.log("Somwtyhing went Wrong While Connecting the Database");
  }
}
