import React from 'react';


const Cart = (props) => {
    const cart=props.cart;
    //const total=cart.reduce((total, prd) => total + prd.price, 0); New method

    let total=0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total= total + product.price * product.quantity;
    }

    let shipping =0;
    if(total > 35){
        shipping=0;
    }
    else if(total > 15){
        shipping=4.99;
    }
    else if(total > 0){
        shipping=12.99;
    }

    const tax= Math.round(total/20);
    
    const grandTotal= total+shipping+tax;

    const formatNumber = num =>{
        const precision = num.toFixed(2);
        return Number(precision);
    }

    return (
        <div>
            <h2>Order Summary</h2>
            <p>Items Ordered: {cart.length}</p>
            <p>products Price: {formatNumber(total)}</p>
            <p><small>Shipping: {shipping}</small></p>
            <p><small>Tax: {tax}</small></p>
            <p>Total Price: {formatNumber(grandTotal)}</p>
            <br/>
            {
                props.children
            }
        </div>
    );
};

export default Cart;