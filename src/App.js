import './App.scss';
import Main from "./components/Main/Main";
import Aside from "./components/Aside/Aside";
import React, {useState} from "react";
import {useGetProductsQuery} from "./redux/products.api";

function App() {
    const {data: allProducts = [], isLoading} = useGetProductsQuery();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState(allProducts);

    if (isLoading) {
        return <h2 className="loading">Loading...</h2>
    } else {
        return (
            <div className="App">
                <main className="container">
                    <Main
                        filteredProducts={filteredProducts}
                        setFilteredProducts={setFilteredProducts}
                        selectedProduct={selectedProduct}
                        setSelectedProduct={setSelectedProduct}
                    />
                    <Aside products={selectedProduct ? [selectedProduct] : filteredProducts}/>
                </main>
            </div>
        );
    }
}

export default App;
