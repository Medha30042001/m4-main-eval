import supabase from "../config/supabase.config.js"
import { validateCustomer } from "../validations/customer.validation.js";

export const registerCustomer = async (req, res) => {

    const err = validateCustomer(req.body);
    if(err){
        return res.status(400).json({error : err});
    }

    const {full_name, email, phone} = req.body;

    const {data, error} = await supabase
        .from('customers')
        .insert([{full_name, email, phone}])
        .select();
    
    if(error){
        if(error.code === '23505'){
            res.status(409).json({error : 'Email already exists'});
        }
        return res.status(500).json({error : error.message});
    }

    res.status(201).json({
        message : 'Customer Registered',
        customer : data
    })
}

export const deleteCustomer = async (req, res) => {
    const {customerId} = req.params;

    const {data, error} = await supabase
        .from('customers')
        .delete()
        .eq('id', customerId)
        .select();

    if(error){
        return res.status(500).json({error : error.message});
    }

    if(data.length === 0){
        return res.status(404).json({error : 'Customer not found'});
    }

    res.status(200).json({
        message : 'Customer deleted'
    });
}