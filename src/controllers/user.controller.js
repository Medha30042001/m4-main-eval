import supabase from "../config/supabase.js";

export const signup = async (req , res) => {
    const {name, email, password, role} = req.body;

    if(!['customer', 'owner', 'driver'].includes(role)){
        return res.status(400).json({error : 'Invalid role'});
    }

    const {data, error} = await supabase
        .from('userss')
        .insert([{name, email, password, role}]);

        if(error){
            return res.status(400).json({error : error.message})
        }
        res.status(201).json({
            message : 'User is created',
            user : data
        })
};