import React from 'react';
import './ProductDtails.css';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Products/Product';

const ProductDtails = () => {
    const { productKey } = useParams()
    const product = fakeData.find(pd => pd.key === productKey);

    return (
        <div>
            <h1>Product details</h1>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDtails;