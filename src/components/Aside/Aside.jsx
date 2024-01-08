import React from 'react';
import "./Aside.scss"
import Product from "../Product/Product";

const Aside = ({products}) => {
    return (
        <aside className="aside">
            <div className="products">
                {products.length > 0
                    ? products.map((product) => (
                        <Product product={product} key={product.id}/>
                    ))
                    : <p>No results</p>
                }
            </div>
        </aside>
    );
};

export default Aside;