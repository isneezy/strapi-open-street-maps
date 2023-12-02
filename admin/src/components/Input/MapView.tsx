import React, { PropsWithChildren, useEffect, useState } from "react"
import L, { DomUtil, LatLng, LatLngExpression, Map } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import fixMapZindex from "../../utils/fixMapZindex"

type ContextType = {
    map: Map
}
export const MapViewContext = React.createContext<ContextType>({ map: undefined as unknown as Map })

type Props = {
    center: LatLngExpression
    onClick?: (latLng: LatLng) => unknown
}

export default function MapView({ center, children, onClick }: PropsWithChildren<Props>) {
    const [ref, setRef] = useState<HTMLDivElement | null>(null)
    const [map, setMap] = useState<Map | undefined>()

    useEffect(() => {
        // @ts-ignore
        if (!ref || ref._leaflet_id) return

        const _map = L.map(ref)

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: '&copy; <a target="_blank" href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(_map)

        fixMapZindex(_map)

        _map.setView(center, 14.5)

        _map.on('click', (event) => {
            if (onClick) onClick(event.latlng)
        })

        setMap(_map)

        return () => {
            if (!map) return
            map.off().remove()
        }
    }, [ref, center])

    return (
        <>
            <div ref={setRef} style={{ height: '300px' }} />
            {map &&
                <MapViewContext.Provider value={{ map }}>{children}</MapViewContext.Provider>
            }
        </>
    )
}