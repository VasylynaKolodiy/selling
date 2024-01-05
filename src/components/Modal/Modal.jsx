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
        coordinates: [48.60, 31.00],
    };

    const [newProduct, setNewProduct] = useState({...initialProduct});

    const handleAddNewProduct = (event) => {
        event.preventDefault();
        console.log('newProduct', [...allProducts, newProduct]);
        setAllProducts([newProduct, ...allProducts]);
        setIsModalOpen(false);
        setNewProduct({...initialProduct});
    }

    const MapEvents = () => {
        const markerGroupRef = useRef(L.layerGroup())

        useMapEvents({
            click: (event) => {
                console.log('markerGroupRef', markerGroupRef);
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

                //L.marker(event.latlng).addTo(event.target);
            },
        });
        return null;
    };

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
                        onChange={(event) => setNewProduct({...newProduct, description: event.target.value})}
                    />
                </label>

                <label htmlFor="price">
                    Price:
                    <input
                        type="text"
                        name="price"
                        id="price"
                        value={newProduct.price}
                        onChange={(event) => setNewProduct({...newProduct, price: event.target.value})}
                    />
                </label>

                <label htmlFor="coordinates">
                    Please, choose coordinates on map:
                    <input
                        type="text"
                        name="coordinates"
                        id="coordinates"
                        value={newProduct.coordinates}
                        onChange={(event) => {
                            const coordinatesArray = event.target.value.split(',').map(coord => Number(coord.trim()));
                            setNewProduct({...newProduct, coordinates: coordinatesArray});
                        }}
                    />
                </label>

                <button type="submit" className="button">Ok</button>

            </form>
        </section>
    );
};

export default Modal;