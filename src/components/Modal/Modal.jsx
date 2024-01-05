import React, {useRef, useState} from 'react';
import "./Modal.scss"
import {v4 as uuidv4} from "uuid";
import Maps from "../Maps/Maps";
import {useMapEvents} from "react-leaflet";
import L from "leaflet";

const Modal = ({isModalOpen, setIsModalOpen, allProducts, setAllProducts}) => {

    const initialProduct = {
        id: uuidv4(),
        name: "",
        description: "",
        price: "",
        image: "",
        coordinates: [],
    };

    const [newProduct, setNewProduct] = useState({...initialProduct});

    const handleAddNewProduct = (event) => {
        event.preventDefault();
        setAllProducts([newProduct, ...allProducts]);
        setIsModalOpen(false);
        setNewProduct({...initialProduct});
    }

    const MapEvents = () => {
        const markerGroupRef = useRef(L.layerGroup())

        useMapEvents({
            click: (event) => {
                markerGroupRef.current.clearLayers();

                const coordinatesArray = event.latlng
                    .toString()
                    .replace('LatLng(', '')
                    .replace(')', '')
                    .split(',')
                    .map((coord) => Number(coord.trim()));
                setNewProduct({...newProduct, coordinates: coordinatesArray});

                const newMarker = L.marker(event.latlng);
                markerGroupRef.current.addLayer(newMarker);
            },
        });
        return null;
    };

    const handleCancelForm = () => {
        setIsModalOpen(false);
        setNewProduct({...initialProduct});
    }

    return (
        <section className={`modal ${isModalOpen ? 'open' : ''}`}>
            <Maps
                allProducts={[newProduct]}
                MapEvents={MapEvents}
            />
            <form
                className="form"
                onSubmit={(event) => handleAddNewProduct(event)}
            >
                <label htmlFor="name">
                    Name:
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={newProduct.name}
                        required={true}
                        onChange={(event) => setNewProduct({...newProduct, name: event.target.value})}
                    />
                </label>

                <label htmlFor="description">
                    Description:
                    <input
                        type="text"
                        name="description"
                        id="description"
                        value={newProduct.description}
                        required={true}
                        onChange={(event) => setNewProduct({...newProduct, description: event.target.value})}
                    />
                </label>

                <label htmlFor="price">
                    Price:
                    <input
                        type="number"
                        name="price"
                        id="price"
                        value={newProduct.price}
                        required={true}
                        onChange={(event) => setNewProduct({...newProduct, price: event.target.value})}
                    />
                </label>

                <label htmlFor="coordinates">
                   Coordinates:
                    <input
                        type="text"
                        name="coordinates"
                        id="coordinates"
                        value={newProduct.coordinates}
                        placeholder="Please, choose on map"
                        readOnly={true}
                        required={true}
                    />
                </label>

                <button type="submit" className="button" disabled={newProduct.coordinates.length === 0}>Ok</button>
                <button type="reset" className="button" onClick={() => handleCancelForm()}>Cancel</button>

            </form>
        </section>
    );
};

export default Modal;