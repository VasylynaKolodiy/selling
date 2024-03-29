import React from 'react';
import "./Product.scss"
import {defaultProductImage} from "../../utils";

const Product = ({product}) => {
    const MAX_DESCRIPTION_LENGTH = 25;

    return (
        <article className="product">
            <div className="product__image">
                {product.image
                    ? <img
                        src={product.image}
                        onError={(event) => {
                            event.target.src = defaultProductImage;
                        }}
                        alt={product.name}/>
                    : <img
                        src={defaultProductImage}
                        alt={product.name}
                    />
                }
            </div>

            <div className="product__info">
                <h2 className="product__name">{product.name}</h2>
                <p className="product__price">{product.price} UAH</p>
                <p className="product__description">
                    {product.description.slice(0, MAX_DESCRIPTION_LENGTH)}
                    {product.description.length > MAX_DESCRIPTION_LENGTH ? "..." : ""}
                </p>
            </div>
        </article>
    );
};

export default Product;