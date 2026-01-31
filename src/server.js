import express from 'express'
import 'dotenv/config'
import userRoutes from './routes/user.routes.js'
import vehicleRoutes from './routes/vehicle.routes.js'
import tripRoutes from './routes/trip.routes.js'
import { notFound } from './middlewares/notFound.js'

const app = express();

app.use(express.json());
app.use('/users', userRoutes);

app.use('/vehicles', vehicleRoutes);
app.use('/trips', tripRoutes);

app.use(notFound);
app.listen(process.env.PORT, () => {
    console.log(`Server running on http://loclhost:${process.env.PORT}`);
})