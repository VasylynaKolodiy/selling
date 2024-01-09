import React, {useEffect, useRef, useState} from 'react';
import "./ModalAddNewProduct.scss"
import {v4 as uuidv4} from "uuid";
import Maps from "../Maps/Maps";
import {useMapEvents} from "react-leaflet";
import L from "leaflet";
import {position} from "../../utils";
import {ReactComponent as IconClose} from "../../assets/images/icon-close.svg";
import {useAddProductMutation} from "../../redux/products.api";

const ModalAddNewProduct = ({isModalOpen, setIsModalOpen}) => {

    const initialProduct = {
        id: uuidv4(),
        name: "",
        description: "",
        price: "",
        image: "",
        coordinates: [],
    };

    const [newProduct, setNewProduct] = useState({...initialProduct});
    const [map, setMap] = useState(null);
    const [addProduct] = useAddProductMutation();

    const handleAddNewProduct = async (event) => {
        event.preventDefault();
        await addProduct(newProduct).unwrap();
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
                    .map((coordinate) => Number(coordinate.trim()));
                setNewProduct({...newProduct, coordinates: coordinatesArray});

                const newMarker = L.marker(event.latlng);
                markerGroupRef.current.addLayer(newMarker);
            },
        });

        return null;
    };

    const handleCancelForm = () => {
        setIsModalOpen(false);
    }

    useEffect(() => {
        map?.setView(position, 6);
        return setNewProduct({...initialProduct});
    }, [isModalOpen])

    return (
        <section className={`modal ${isModalOpen ? 'open' : ''}`}>

            <div className="modal__close" onClick={() => setIsModalOpen(false)}>
                <IconClose/>
            </div>

            <Maps
                products={[newProduct]}
                MapEvents={MapEvents}
                map={map}
                setMap={setMap}
            />
            <form
                className="form"
                onSubmit={(event) => handleAddNewProduct(event)}
            >
                <div className="form__inputs">
                    <label htmlFor="name">
                        <sup>*</sup>Name:
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={newProduct.name}
                            autoComplete="off"
                            required={true}
                            onChange={(event) => setNewProduct({...newProduct, name: event.target.value})}
                        />
                    </label>

                    <label htmlFor="description">
                        <sup>*</sup>Description:
                        <input
                            type="text"
                            name="description"
                            id="description"
                            value={newProduct.description}
                            autoComplete="off"
                            required={true}
                            onChange={(event) => setNewProduct({...newProduct, description: event.target.value})}
                        />
                    </label>

                    <label htmlFor="price">
                        <sup>*</sup>Price:
                        <input
                            type="number"
                            name="price"
                            id="price"
                            value={newProduct.price}
                            autoComplete="off"
                            required={true}
                            onChange={(event) => setNewProduct({...newProduct, price: event.target.value})}
                        />
                    </label>

                    <label htmlFor="image">
                        Image:
                        <input
                            type="text"
                            name="image"
                            id="image"
                            value={newProduct.image}
                            autoComplete="off"
                            onChange={(event) => setNewProduct({...newProduct, image: event.target.value})}
                        />
                    </label>

                    <label htmlFor="coordinates">
                        <sup>*</sup>Coordinates:
                        <input
                            type="text"
                            name="coordinates"
                            id="coordinates"
                            value={newProduct.coordinates}
                            placeholder="choose on the map..."
                            autoComplete="off"
                            readOnly={true}
                            required={true}
                        />
                    </label>
                </div>

                <div className="buttons">
                    <button
                        type="submit"
                        className="button"
                        disabled={newProduct.coordinates.length === 0}
                    >
                        Ok
                    </button>

                    <button
                        type="reset"
                        className="button"
                        onClick={() => handleCancelForm()}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </section>
    );
};

export default ModalAddNewProduct;