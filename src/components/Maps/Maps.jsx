import React, {useEffect, useRef, useState} from 'react'
import "./Maps.scss"
import {MapContainer, Marker, TileLayer} from "react-leaflet";
import L from "leaflet";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
})
L.Marker.prototype.options.icon = DefaultIcon;

const Maps = ({
                  allProducts,
                  setFilteredProducts = null,
                  selectedProduct = null,
                  setSelectedProduct = null,
                  MapEvents = null
              }) => {
    const position = [48.60, 31.00]; // Coordinates for center

    const customMarkerIcon = new L.Icon({
        iconUrl: 'https://static.vecteezy.com/system/resources/previews/022/062/128/large_2x/location-pointer-pin-icon-free-png.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });

    const selectedMarkerIcon = new L.Icon({
        iconUrl: 'https://static.vecteezy.com/system/resources/previews/010/160/143/large_2x/location-pin-icon-sign-symbol-design-free-png.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    })

    const mapRef = useRef();
    const map = mapRef.current;
    const [currentBounds, setCurrentBounds] = useState(map?.getBounds() || null);

    function isPointInBounds(point, bounds) {
        const {lat: pointLat, lng: pointLng} = L.latLng(point);
        const {lat: northEastLat, lng: northEastLng} = bounds._northEast;
        const {lat: southWestLat, lng: southWestLng} = bounds._southWest;

        return (
            pointLat <= northEastLat &&
            pointLat >= southWestLat &&
            pointLng <= northEastLng &&
            pointLng >= southWestLng
        );
    }

    useEffect(() => {
        if (setFilteredProducts) {
            const handleMoveOrZoomEnd = () => {
                setCurrentBounds(map?.getBounds());
            };

            if (map) {
                map?.on('moveend', handleMoveOrZoomEnd);
                map?.on('zoomend', handleMoveOrZoomEnd);
            }

            return () => {
                if (map) {
                    map?.off('moveend', handleMoveOrZoomEnd);
                    map?.off('zoomend', handleMoveOrZoomEnd);
                }
            };
        }
    }, [mapRef.current, setCurrentBounds]);

    useEffect(() => {
        if (setFilteredProducts && currentBounds) {
            const result = allProducts.filter((product) => {
                return isPointInBounds(product.coordinates, currentBounds) && product;
            })
            result && setFilteredProducts(result);
        }
    }, [currentBounds, allProducts])

    return (
        <article className="maps">
            <MapContainer
                center={position}
                zoom={6}
                minZoom={6}
                scrollWheelZoom={true}
                style={{height: "100%", width: "100%",}}
                ref={mapRef}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {allProducts.map((product) => (
                    Array.isArray(product.coordinates) && product.coordinates.length === 2 && (
                        <Marker
                            position={product.coordinates}
                            key={product.id}
                            icon={
                                (selectedProduct && (product.id === selectedProduct.id))
                                    ? selectedMarkerIcon
                                    : customMarkerIcon
                            }
                            eventHandlers={{
                                click: () => {
                                    setSelectedProduct && (
                                        selectedProduct?.id === product.id ? setSelectedProduct(null) : setSelectedProduct(product)
                                    );
                                },
                            }}
                        >
                        </Marker>
                    )
                ))}

                {MapEvents && <MapEvents/>}

            </MapContainer>
        </article>
    );
};

export default Maps;