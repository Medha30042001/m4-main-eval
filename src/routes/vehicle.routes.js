import express from 'express';
import { addVehicle, 
        getVehicle, 
        setDriver } from '../controllers/vehicle.controller.js';

const router = express.Router();

router.post('/add', addVehicle)
router.patch('assign-driver/:vehicleId', setDriver);
router.get('/:vehicleId', getVehicle);

export default router;