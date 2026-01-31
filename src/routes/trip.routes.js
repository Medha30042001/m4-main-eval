import express from 'express';
import { createTrip, 
        updateTrip } from '../controllers/trip.controller.js';

const router = express.Router();

router.post('/create', createTrip);
router.put('/update', updateTrip);
router.get('/:tripId');
router.delete('/delete/:tripId');

export default router;