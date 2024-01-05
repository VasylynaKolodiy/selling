import './App.scss';
import Main from "./components/Main/Main";
import Aside from "./components/Aside/Aside";
import {products} from "./assets/utils";
import React, {useEffect, useState} from "react";

function App() {
    const [allProducts, setAllProducts] = useState([...products]);
    const [selectedProducts, setSelectedProducts] = useState([...allProducts]);

    useEffect(() => {
        setSelectedProducts([...allProducts]);
    }, [allProducts])

    return (
        <div className="App">
            <main className="container">
                <Main
                    allProducts={allProducts}
                    setAllProducts={setAllProducts}
                    selectedProducts={selectedProducts}
                    setSelectedProducts={setSelectedProducts}
                />
                <Aside products={selectedProducts}/>
            </main>
        </div>
    );
}

export default App;
