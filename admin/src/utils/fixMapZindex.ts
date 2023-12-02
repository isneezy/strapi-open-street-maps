import { Map } from "leaflet"

function ajustContainersParentElementZIndex(container?: HTMLElement, zIndex = '0') {
    if (container) {
        const containerParent = container.parentElement
        if (containerParent) containerParent.style.zIndex = '0'
    }
}

export default function fixMapZindex(map: Map) {
    const panes = map.getPanes()

    Object.keys(panes).forEach((key: keyof typeof panes) => {
        panes[key].style.zIndex = '0'
    })

    ajustContainersParentElementZIndex(map.attributionControl.getContainer())
    ajustContainersParentElementZIndex(map.zoomControl.getContainer())
}