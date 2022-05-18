import React, { useState, useEffect, ReactNode } from "react"
import MapContext from "./MapContext"
import OlMap from "ol/map"
import TileLayer from "ol/layer/tile"
import OSMSource from "ol/source/osm"
import View from "ol/view"

export interface MapProviderProps {
    /**
     * React Node - children of the map component
     */
    children: ReactNode,
    /**
     * Custom ol map if desired
     */
    map: OlMap | null,
    /** 
     * callback that fires once the map has initialized
     */
    onMapInit: ((map: OlMap) => Promise<void>),
}


/**
 * Map component - adds map to view and also puts the ol map into context
 */
const Map: React.FC<MapProviderProps> = (props) => {
    const { children, onMapInit = () => {} } = props
    const [map, setMap] = useState<OlMap | null>(null)

    const onMapReady = (passedMap: OlMap) => {
        const allSystemsGo = () => {
            setMap(passedMap)
        }
        // pass map back via callback prop
        const initCallback = onMapInit(passedMap)
        // if onMapInit prop returns a promise, render children after promise is resolved
        const isPromise = !!initCallback && typeof initCallback.then === "function"
  
        // update AFTER onMapInit to get map into the state/context
        isPromise
          ? initCallback
            .catch(e => console.error("Error caught in \"onMapInit\"", e))
            .finally(allSystemsGo) // always initialize app
          : allSystemsGo()
      }

    useEffect(() => {
        if (props.map) {
            onMapReady(props.map)
        }
        const map = new OlMap({
            view: new View({
                center: [0, 0],
                zoom: 1
            }),
            layers: [new TileLayer({
                preload: Infinity,
                source: new OSMSource()
            })],
            controls: [],
        })

        onMapReady(map)
    }, [])

    return (
        <MapContext.Provider value={map}>
            {map && children}
        </MapContext.Provider>
    )
}
export default Map
