import supabase from "../config/supabase.js";

export const addVehicle = async (req, res) => {
    const {name, registration_number, allowed_passengers, rate_per_km, owner_id} = req.body;

    const {data : owner} = await supabase
        .from('users')
        .select('role')
        .eq('id', owner_id)
        .single();

    if(!owner || owner.role !== 'owner') {
        return res.status(400).json({error : 'Not an owner, cannot add vehicle'})
    }

    const {data, error} = await supabase
        .from('vehicles')
        .insert([{name, registration_number, allowed_passengers, rate_per_km, owner_id}])

    if(error){
        return res.status(400).json({error : error.message})
    }

    res.status(201).json({
        message : 'Vehicle added',
        vehicle : data
    })
}   

export const setDriver = async (req , res) => {

    const {vehicleId} = req.params;
    const {driver_id} = req.body;

    const {data, error} = await supabase 
        .from('vehicles')
        .update({driver_id})
        .eq('id', vehicleId);

    if(error){
        return res.status(400).json({error : error.message})
    }

    res.status(200).json({
        message : 'Driver is set',
        driver : data
    })
}

export const getVehicle = async (req , res) => {
    const {vehicleId} = req.params;
    const {data, error} = await supabase 
        .from('vehicles')
        .select()
        .eq('id', vehicleId)
        .single();

    if(error){
        return res.status(400).json({error : error.message})
    }

    res.status(200).json({
        message : 'Fetched vehicles',
        vehicles : data
    })
}