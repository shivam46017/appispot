import { useMapEvents } from "react-leaflet";

const MapEvent = ({ onChange }) => {

    useMapEvents({
        click(e) {
            onChange(e.latlng)
            console.log(e.latlng)
        }
    })

    return null

}

export default MapEvent