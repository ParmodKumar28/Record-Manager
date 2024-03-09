// Record's controller file is here for communication's between route's and repository
// Import's
import { validationResult } from "express-validator";
import * as recordRepository from "../model/records.repository.js";
import ErrorHandler from "../../../utils/ErrorHandler.js";

// Creating a record in particular database
export const createRecord = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Constructing error message from errors array
      const errorMessages = errors
        .array()
        .map((error) => error.msg)
        .join(", ");
      return next(new ErrorHandler(400, errorMessages));
    }

    const { name, email, phoneNumber, database } = req.body;
    if (!database) {
      return next(
        new ErrorHandler(
          400,
          "Please give database also where to create record!"
        )
      );
    }

    // Create new record
    const newRecord = await recordRepository.createRecord({
      name,
      email,
      phoneNumber,
      database,
    });

    res
      .status(201)
      .json({ message: "Record created successfully", record: newRecord });
  } catch (error) {
    return next(new ErrorHandler(400, error.message));
  }
};

// Getting all record's for particular database
export const getAllRecords = async (req, res, next) => {
  try {
    const { database } = req.query;
    const records = await recordRepository.getAllRecords(database);
    res.json(records);
  } catch (error) {
    return next(new ErrorHandler(400, error.message));
  }
};

// Get a record by id in particular database
export const getRecordById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { database } = req.query;
    const record = await recordRepository.getRecordById(id, database);
    if (!record) {
      return next(new ErrorHandler(404, "Record not found"));
    }
    res.json(record);
  } catch (error) {
    return next(new ErrorHandler(400, error.message));
  }
};

// Update a record by id in particular database
export const updateRecord = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { database } = req.query;
    const newData = req.body;
    const updatedRecord = await recordRepository.updateRecord(
      id,
      newData,
      database
    );
    if (!updatedRecord) {
      return next(new ErrorHandler(404, "Record not found"));
    }
    res.json({ message: "Record updated successfully", record: updatedRecord });
  } catch (error) {
    return next(new ErrorHandler(400, error.message));
  }
};

// Delete a record by id in particular database
export const deleteRecord = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { database } = req.query;
    const deletedRecord = await recordRepository.deleteRecord(id, database);
    if (!deletedRecord) {
      return next(new ErrorHandler(404, "Record not found"));
    }
    res.json({ message: "Record deleted successfully", record: deletedRecord });
  } catch (error) {
    return next(new ErrorHandler(400, error.message));
  }
};
