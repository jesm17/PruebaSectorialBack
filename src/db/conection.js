import mongoose from "mongoose";

const MONGO_USERNAME = "admin";
const MONGO_PASSWORD = "123456789";
const MONGO_HOSTNAME = "127.0.0.1";
const MONGO_PORT = "27017";
const MONGO_DB = "prueba";
export async function conection() {
  try {
    await mongoose.connect(
      `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`
    ),
      { useNewUrlParser: true, useUnifiedTopology: true };
  } catch (error) {
    console.log("error", error);
  }
}
