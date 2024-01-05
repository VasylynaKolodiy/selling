import React from 'react'
import "./Maps.scss"
import {MapContainer, Marker, TileLayer} from "react-leaflet";
import L from "leaflet";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

const Maps = ({allProducts, selectedProducts = null, setSelectedProducts = null, MapEvents = null}) => {
    const position = [48.60, 31.00]; // Coordinates for center

    const customMarkerIcon = new L.Icon({
        iconUrl: 'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|abcdef&chf=a,s,ee00FFFF',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });

    const selectedMarkerIcon = new L.Icon({
        iconUrl: 'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|2ecc71&chf=a,s,ee00FFFF',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });

    return (
        <article className="maps">
            <MapContainer
                center={position}
                zoom={6}
                minZoom={6}
                scrollWheelZoom={true}
                style={{height: "100%", width: "100%",}}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {allProducts.map((product) => (
                    product.coordinates.length > 0 && (
                        <Marker
                            position={product.coordinates}
                            key={product.id}
                            icon={
                                (selectedProducts && product.id === selectedProducts[0].id && selectedProducts.length === 1)
                                    ? selectedMarkerIcon
                                    : customMarkerIcon
                            }
                            eventHandlers={{
                                click: () => {
                                    setSelectedProducts && setSelectedProducts([product]);
                                },
                            }}
                        >
                        </Marker>
                    )))}

                {MapEvents && <MapEvents/>}

            </MapContainer>
        </article>
    );
};

export default Maps;