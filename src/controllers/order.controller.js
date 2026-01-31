import supabase from "../config/supabase.config.js"
import { validateOrder } from "../validations/order.validation.js";

export const createOrder = async (req, res) => {

    const err = validateOrder(req.body);
    if(err){
        return res.status(400).json({error : err});
    }

    const {product_name, quantity, price, customer_id} = req.body;

    const {data, error} = await supabase
        .from('orderss')
        .insert([{product_name, quantity, price, customer_id}])
        .select();

    if(error){
        return res.status(500).json({error : error.message});
    }

    res.status(201).json({
        message : 'Order added',
        order : data
    })
}

export const getCustomerOrder = async (req, res) => {

    const {customerId} = req.params;

    const {data : customer, error : customerError} = await supabase
        .from('customers')
        .select('id')
        .eq('id', customerId)
        .single();

    if(customerError){
        return res.status(404).json({error : 'Customer not found'});
    }

    const {data, error} = await supabase
        .from('orderss')
        .select()
        .eq('customer_id', customerId);

    if(error){
        return res.status(500).json({error : error.message});
    }

    if(data.length === 0){
        return res.status(400).json({error : 'No orders from this customer'});
    }

    res.status(200).json({
        message : 'Orders from the requested customer fetched',
        orders : data
    })
}

export const updateOrder = async (req, res) => {
    const {orderId} = req.params;
    const updates = req.body;
    const {data, error} = await supabase
        .from('orderss')
        .update(updates)
        .eq('id', orderId)
        .select();

    if(error){
        return res.status(500).json({error : error.message});
    }

    if(data.length === 0){
        return res.status(404).json({error : 'Order not found'});
    }

    res.status(200).json({
        message : 'Order updated',
        order : data
    });

}

export const deleteOrder = async (req, res) => {
    const {orderId} = req.params;
    
    const {data, error} = await supabase
        .from('orderss')
        .delete()
        .eq('id', orderId)
        .select();

    if(error){
        return res.status(500).json({error : error.message});
    }

    if(data.length === 0){
        return res.status(404).json({error : 'Order not found'});
    }

    res.status(200).json({
        message : 'Order deleted',
        order : data
    });
}