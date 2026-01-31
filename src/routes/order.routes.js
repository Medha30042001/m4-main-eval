import express from 'express';
import { createOrder, 
        deleteOrder, 
        getCustomerOrder, 
        updateOrder} from '../controllers/order.controller.js';

const router = express.Router();

router.post('/add-order', createOrder);
router.get('/get-my-orders/:customerId', getCustomerOrder);
router.put('/update-order/:orderId', updateOrder);
router.delete('/delete-order/:orderId', deleteOrder);
export default router;