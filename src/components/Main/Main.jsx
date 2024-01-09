import React, {useEffect, useState} from 'react';
import './Main.scss';
import 'leaflet/dist/leaflet.css';
import ModalAddNewProduct from "../ModalAddNewProduct/ModalAddNewProduct";
import Maps from "../Maps/Maps";
import {position} from "../../utils";
import {useGetProductsQuery} from "../../redux/products.api";

const Main = ({
                  filteredProducts,
                  setFilteredProducts,
                  selectedProduct,
                  setSelectedProduct
              }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [map, setMap] = useState(null);
    const {data: allProducts = []} = useGetProductsQuery();

    const handleAddNewProduct = () => {
        setIsModalOpen(true);
    }

    const handleResetFilters = () => {
        setSelectedProduct(null);
        map.setView(position, 6);
    }

    useEffect(() => {
        map?.setView(position, 6);
    }, [allProducts])

    return (
        <section className="general">
            <Maps
                products={allProducts}
                setFilteredProducts={setFilteredProducts}
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
                map={map}
                setMap={setMap}
            />

            <section className="buttons">
                <button
                    className="button"
                    type="button"
                    onClick={() => handleAddNewProduct()}
                >
                    Add product
                </button>

                <button
                    className="button"
                    type="button"
                    onClick={() => handleResetFilters()}
                    disabled={!selectedProduct && (allProducts.length === filteredProducts.length)}
                >
                    Reset filters
                </button>
            </section>

            <div className={`overlay ${isModalOpen ? 'visible' : ''}`} onClick={() => setIsModalOpen(false)}/>
            <ModalAddNewProduct
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
        </section>
    );
};

export default Main;