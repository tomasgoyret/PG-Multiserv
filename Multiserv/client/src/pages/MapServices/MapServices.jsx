import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux'
import { LocationMarker } from './LocationMarker'
import { mapServices } from '../../redux/actions/actions'

export const MapServices = () => {
    const dispatch = useDispatch()
    const serviciosMapa = useSelector(state => state.mapServices)
    useEffect(() => {
        dispatch(mapServices)
    }, [])
    return (
        <div className='m-2 w-full h-screen' >
            <MapContainer center={{ lat: 51.505, lng: -0.09 }} zoom={20} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {serviciosMapa.length > 0 ? serviciosMapa.map(service => service.location && (<Marker position={service.location} >
                    <Popup>
                        {service.title}<br />
                        {service.address}
                    </Popup>
                </Marker>)) : ''}
                <LocationMarker />
            </MapContainer>
        </div>
    )
}