import React, { useState, useEffect } from 'react';
import './Review.css';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItems from '../ReviewItems/ReviewItems';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/UseAuth';

const Review = () => {
    const [cart, setCart]= useState([]);
    const [placeOrder, setPlaceOrder] = useState(false);
    const auth = useAuth();

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
                {
                    !cart.length && <h1>You have not added anything yet. <a href="/shop">Keep shopping</a></h1>
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/Shipment">
                        {
                            auth.user ?
                            <button className="main-button">Proceed to Shipment</button>
                            :
                            <button className="main-button">Log in to Proceed</button>
                        }
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Review;