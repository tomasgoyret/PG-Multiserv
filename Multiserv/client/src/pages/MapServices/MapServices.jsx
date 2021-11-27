import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useSelector } from 'react-redux'
import { LocationMarker } from './LocationMarker'

export const MapServices = () => {
    const { mapServices } = useSelector(state => state)
    console.log(mapServices)
    return (
        <div className='m-2 w-full h-screen' >
            <MapContainer center={{ lat: 51.505, lng: -0.09 }} zoom={20} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {mapServices.length > 0 ? mapServices.map(service => (<Marker position={service.location} >
                    <Popup> 
                        {service.title}<br/>
                        {service.address}
                    </Popup>
                </Marker>)) : (<div></div>)}
                <LocationMarker />
            </MapContainer>
        </div>
    )
}