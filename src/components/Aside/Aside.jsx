import React from 'react';
import "./Aside.scss"
import Product from "../Product/Product";

const Aside = ({products}) => {
    return (
        <aside className="aside">
            <div className="products">
                {products.map((product) => (
                    <Product product={product} key={product.id}/>
                ))}
            </div>
        </aside>
    );
};

export default Aside;