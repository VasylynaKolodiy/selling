import React, {useState} from 'react';
import './Main.scss';
import 'leaflet/dist/leaflet.css';
import ModalAddNewProduct from "../ModalAddNewProduct/ModalAddNewProduct";
import Maps from "../Maps/Maps";
import {position} from "../../utils";

const Main = ({
                  allProducts,
                  setAllProducts,
                  filteredProducts,
                  setFilteredProducts,
                  selectedProduct,
                  setSelectedProduct
              }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [map, setMap] = useState(null);

    const handleAddNewProduct = () => {
        setIsModalOpen(true);
    }

    const handleResetFilters = () => {
        setSelectedProduct(null);
        map.setView(position, 6);
    }

    return (
        <section className="general">
            <Maps
                allProducts={allProducts}
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
                    Add
                </button>

                <button
                    className="button"
                    type="button"
                    onClick={() => handleResetFilters()}
                    disabled={!selectedProduct && (allProducts.length === filteredProducts.length)}
                >
                    Show all products
                </button>
            </section>

            <ModalAddNewProduct
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                allProducts={allProducts}
                setAllProducts={setAllProducts}
            />
        </section>
    );
};

export default Main;