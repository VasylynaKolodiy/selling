import './App.scss';
import Main from "./components/Main/Main";
import Aside from "./components/Aside/Aside";
import {products} from "./utils";
import React, {useState} from "react";
import {useGetProductsQuery} from "./redux";

function App() {
    const [allProducts, setAllProducts] = useState(products);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState(allProducts);

    const {data = [], isLoading} = useGetProductsQuery(null, {refetchOnMountOrArgChange: true});
    console.log("DATA", data);

    if (isLoading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="App">
            <main className="container">
                <Main
                    allProducts={allProducts}
                    setAllProducts={setAllProducts}
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

export default App;
