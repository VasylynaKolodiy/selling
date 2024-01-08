import React, {useEffect, useState} from 'react'
import "./Maps.scss"
import {MapContainer, Marker, TileLayer} from "react-leaflet";
import L from "leaflet";
import {position} from "../../utils";
import MarkerClusterGroup from 'react-leaflet-cluster';

const Maps = ({
                  allProducts,
                  setFilteredProducts = null,
                  selectedProduct = null,
                  setSelectedProduct = null,
                  MapEvents = null,
                  map,
                  setMap
              }) => {

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

    const [currentBounds, setCurrentBounds] = useState(null);

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
        if (map) setCurrentBounds(map?.getBounds())
    }, [map])

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
    }, [map, currentBounds]);

    useEffect(() => {
        if (setFilteredProducts && currentBounds) {
            const result = allProducts.filter((product) => {
                return isPointInBounds(product.coordinates, currentBounds) && product;
            })
            result && setFilteredProducts(result);
        }
    }, [currentBounds, allProducts, selectedProduct])

    return (
        <article className="maps">
            <MapContainer
                center={position}
                zoom={6}
                minZoom={6}
                scrollWheelZoom={true}
                style={{height: "100%", width: "100%",}}
                ref={setMap}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MarkerClusterGroup
                    chunkedLoading
                >
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
                                            (selectedProduct?.id === product.id) ? setSelectedProduct(null) : setSelectedProduct(product)
                                        );
                                    },
                                }}
                            >
                            </Marker>
                        )
                    ))}
                </MarkerClusterGroup>

                {MapEvents && <MapEvents/>}

            </MapContainer>
        </article>
    );
};

export default Maps;