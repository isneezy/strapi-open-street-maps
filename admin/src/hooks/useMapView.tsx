import React from "react";
import { MapViewContext } from "../components/Input/MapView";

export default function useMapView () {
    return React.useContext(MapViewContext)
}