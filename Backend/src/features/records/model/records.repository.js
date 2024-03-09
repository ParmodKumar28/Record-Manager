// Record's repository file is here for database communication's here
// Import's
import ErrorHandler from "../../../utils/ErrorHandler.js";
import Record from "./records.schema.js";

export const createRecord = async (recordData) => {
  try {
    const record = new Record(recordData);
    return await record.save();
  } catch (error) {
    throw new ErrorHandler(400, "Error creating record");
  }
};

export const getAllRecords = async (database) => {
  try {
    return await Record.find({ database });
  } catch (error) {
    throw new ErrorHandler(400, "Error fetching records");
  }
};

export const getRecordById = async (id, database) => {
  try {
    return await Record.findOne({ _id: id, database });
  } catch (error) {
    throw new ErrorHandler(400, "Error finding record by ID");
  }
};

export const updateRecord = async (id, newData, database) => {
  try {
    return await Record.findOneAndUpdate({ _id: id, database }, newData, {
      new: true,
    });
  } catch (error) {
    throw new ErrorHandler(400, "Error updating record");
  }
};

export const deleteRecord = async (id, database) => {
  try {
    return await Record.findOneAndDelete({ _id: id, database });
  } catch (error) {
    throw new ErrorHandler(400, "Error deleting record");
  }
};
