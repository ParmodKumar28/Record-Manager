// Record's route's file is here
// Import's
import express from 'express';
import { body } from 'express-validator';
import * as recordController from '../controller/record.controller.js';

const router = express.Router();

// Define routes
router.post('/', [
  // Validate request body
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('phoneNumber').notEmpty().withMessage('Phone number is required'),
], recordController.createRecord);

router.get('/', recordController.getAllRecords);

router.get('/:id', recordController.getRecordById);

router.put('/:id', recordController.updateRecord);

router.delete('/:id', recordController.deleteRecord);

export default router;
