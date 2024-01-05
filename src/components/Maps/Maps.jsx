import React from 'react'
import "./Maps.scss"
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import L from "leaflet";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

const Maps = ({allProducts, setSelectedProducts = null, MapEvents = null}) => {
    const position = [48.60, 31.00]; // Coordinates for center, Ukraine

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
                    <Marker
                        id={1}
                        position={product.coordinates || null}
                        key={product.id}
                        eventHandlers={{
                            click: () => {
                                setSelectedProducts && setSelectedProducts([product])
                            },
                        }}
                    >
                        <Popup>
                            {`Coordinates for ${product.name}, Ukraine`}
                        </Popup>
                    </Marker>
                ))}

                {MapEvents && <MapEvents/>}

            </MapContainer>
        </article>
    );
};

export default Maps;