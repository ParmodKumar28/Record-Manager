// Record schema and model is here
import mongoose from "mongoose";

const recordSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    database: {
      type: String,
      enum: ["databaseOne", "databaseTwo", "databaseThree"],
      required: true,
    },
  },
  { timestamps: true }
);

const Record = mongoose.model("Record", recordSchema);
export default Record;
