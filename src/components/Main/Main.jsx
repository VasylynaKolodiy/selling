import React, {useState} from 'react';
import './Main.scss';
import 'leaflet/dist/leaflet.css';
import ModalAddNewProduct from "../ModalAddNewProduct/ModalAddNewProduct";
import Maps from "../Maps/Maps";

const Main = ({
                  allProducts,
                  setAllProducts,
                  setFilteredProducts,
                  selectedProduct,
                  setSelectedProduct
              }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleResetFilters = () => {
        setSelectedProduct(null);
    }

    return (
        <section className="general">
            <Maps
                allProducts={allProducts}
                setFilteredProducts={setFilteredProducts}
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
            />

            <section className="buttons">
                <button
                    className="button"
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                >
                    Add
                </button>

                <button
                    className="button"
                    type="button"
                    onClick={() => handleResetFilters()}
                    disabled={!selectedProduct}
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