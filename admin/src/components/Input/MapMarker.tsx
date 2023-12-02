// @ts-ignore
import MarkerIcon from 'leaflet/src/images/marker.svg'
import useMapView from '../../hooks/useMapView'
import { useEffect } from 'react'
import L, { LatLng, LatLngExpression, Marker } from 'leaflet'

type Props = {
    latLng: LatLngExpression
    onChange?: (latLng: LatLng) => unknown
}

const iconSize = 32

export default function MapMarker ({ latLng, onChange }: Props) {
    const { map } = useMapView()    
    useEffect(() => {
        const icon = L.icon({ iconUrl: MarkerIcon, iconSize: [iconSize, iconSize], iconAnchor: [iconSize/2, iconSize]})
        const marker = L.marker(latLng, {
            icon,
            draggable: true
        }).addTo(map)
        .on('dragend', (e) => {
            if(!onChange) return
            onChange(e.target.getLatLng())
        })        
        
        return () => {
            marker.off().remove()
        }
    }, [map, latLng])
    return <></>
}