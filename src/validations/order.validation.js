export const validateOrder = ({product_name, quantity, price, customer_id}) => {
    if(!product_name || !quantity || !price || !customer_id){
        return 'Fill all fields';
    }
    if(typeof product_name  !== 'string'){
        return 'Product name must be a string';
    }
    if(typeof quantity  !== 'number' || quantity < 0){
        return 'Quantity is a positive integer'
    }

    return null;
}