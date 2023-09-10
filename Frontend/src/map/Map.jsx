import React from 'react'
import {
    MapContainer as LeafletMap,
    TileLayer,
    Marker,
    Popup,
    useMap
} from "react-leaflet";

function Map({mapContainerProps, changeViewProps}) {
    return (
        <LeafletMap
        {...mapContainerProps}
            center={center}
            zoom={zoom}
            attributionControl={true}
            zoomControl={true}
            className="h-full min-w-full"
        >
            <ChangeView center={center} zoom={zoom} />
            <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
            <Marker position={center} >
                <Popup>Popup for any custom information.</Popup>
            </Marker>
        </LeafletMap>
    )
}

export default Map