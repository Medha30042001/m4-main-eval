import supabase from "../config/supabase";

export const createTrip = async (req, res) => {
    const {customer_id, vehicle_id, passengers, distance_km, location} = req.body;

    const {data : vehicle} = await supabase 
        .from('vehicles')
        .select()
        .eq('id', vehicle_id)
        .single();

    if(!vehicle.isAvailable){
        return res.status(400).json({error : 'Vehicle is not available'})
    }

    if(passengers > vehicle.allowed_passengers){
        return res.status(400).json({error : 'Too many passengers'})
    }

    await supabase
        .from('vehicles')
        .update({isAvailable:false})
        .eq('id', vehicle_id);

    const {data, error} = await supabase 
        .from('trips')
        .insert([{customer_id, vehicle_id, passengers, distance_km, location}]);

    if(error){
        return res.stauts(400).json({error : error.message})
    }

    res.status(201).json({
        message : 'Trip created',
        trip : data
    })
}

export const updateTrip = async (req , res) => {
    const {tripId} = req.params;

    const {data : trip} = await supabase
        .from('trip')
        .select('distance_km, vehicle_id')
        .eq('id', tripId)
        .single();

    const {data : vehicle} = await supabase
        .from('vehicles')
        .select("rate_per_km")
        .eq('id', trip.vehicle_id)
        .single();

    const cost = trip.distannce_km * vehicle.rate_per_km;

    const {data, error} = await supabase
        .from('trips').update({
            isCompleted : true,
            tripCost : cost
        }).eq('id', tripId);

        await supabase.from('vehicles').update({
            isAvailable : true
        }).eq('id', trip.vehicle_id);

    res.status(200).json({
        message : 'Trip is completed',
        const : data
    })
}