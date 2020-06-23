import React, { useState, useEffect } from 'react';
import './Review.css';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItems from '../ReviewItems/ReviewItems';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';

const Review = () => {
    const [cart, setCart]= useState([]);

    const [placeOrder, setPlaceOrder] = useState(false);

    const handlePlaceOrder= ()=>{
        setCart([]);
        setPlaceOrder(true);
        processOrder();
        }

    const removeProduct=(productsKey)=>{
        const newCart = cart.filter(pd=> pd.key !== productsKey);
        setCart(newCart);
        removeFromDatabaseCart(productsKey);
    }

    useEffect(()=>{
        const saveCart=getDatabaseCart();
        const productsKeys = Object.keys(saveCart);
        const cartProducts = productsKeys.map( key =>{
            const product = fakeData.find(pd=> pd.key === key);
            product.quantity = saveCart[key];
            return product;
        });
        setCart(cartProducts);
    },[]);
    
    let thankYou;
    if(placeOrder){
        thankYou= <img src={happyImage} alt=""/>
    } 

    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    cart.map(pd=> <ReviewItems
                        key={pd.key}
                        removeProduct = {removeProduct}
                        product={pd}></ReviewItems>)
                }
                {thankYou}
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button 
                        onClick={handlePlaceOrder}
                        className="main-button"
                    >Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;