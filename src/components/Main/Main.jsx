import React, {useState} from 'react';
import './Main.scss';
import 'leaflet/dist/leaflet.css';
import Modal from "../Modal/Modal";
import Maps from "../Maps/Maps";

const Main = ({allProducts, setAllProducts, selectedProducts, setSelectedProducts}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handlerShowAllProducts = () => {
        setSelectedProducts([...allProducts])
    }

    return (
        <section className="general">

            <Maps
                allProducts={allProducts}
                selectedProducts={selectedProducts}
                setSelectedProducts={setSelectedProducts}
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
                    onClick={() => handlerShowAllProducts()}
                    disabled={allProducts.length === selectedProducts.length}
                >
                    Show all products
                </button>
            </section>

            <Modal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                allProducts={allProducts}
                setAllProducts={setAllProducts}
            />
        </section>
    );
};

export default Main;