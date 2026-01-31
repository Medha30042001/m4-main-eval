import express from 'express';
import { registerCustomer, 
        deleteCustomer } from '../controllers/customer.controller.js';

const router = express.Router();

router.post('/register', registerCustomer);
router.delete('/:customerId', deleteCustomer);

export default router;