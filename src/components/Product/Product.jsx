import React from 'react';
import "./Product.scss"

const Product = ({product}) => {
    return (
        <article className="product">
            <h2>{product.name}</h2>
            <p>price - {product.price}</p>
            <p>description - {product.description}</p>
        </article>
    );
};

export default Product;