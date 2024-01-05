import React, {useState} from 'react';
import './Main.scss';
import 'leaflet/dist/leaflet.css';
import Modal from "../Modal/Modal";
import Maps from "../Maps/Maps";

const Main = ({allProducts, setAllProducts, setSelectedProducts}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="general">

            <Maps
                allProducts={allProducts}
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