import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { LocationMarker } from './LocationMarker'

export const MapServices = () => {
    return (
        <div className='m-2 w-full h-96' >
            <MapContainer center={{lat: 51.505, lng: -0.09}} zoom={15} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker />
            </MapContainer>
        </div>
    )
}