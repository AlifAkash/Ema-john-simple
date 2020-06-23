import React from 'react';
import './ReviewItems.css';

const ReviewItems = (props) => {
    const {name,quantity,img, key, price} = props.product;
    return (
        <div className="review-item">
            <div className="product">
                <div>
                    <img src={img} alt=""/>
                </div>
                <div>
                    <h4 className="product-name">{name}</h4>
                    <p><small>${price}</small></p>
                    <p>Quantity: {quantity}</p>
                    <br/>
                    <button 
                        className="main-button"
                        onClick={()=>props.removeProduct(key)}
                    >Remove</button>
                </div>
            </div>
         </div>
    );
};

export default ReviewItems;