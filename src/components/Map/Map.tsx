import React, { ReactNode, useEffect } from "react"
import useMapContext from "./useMapContext"

export interface MapProps {
    children: ReactNode
}

const Map: React.FC<MapProps> = (props) => {
    const { children } = props
    const map = useMapContext()

    useEffect(() => {
        map?.setTarget("map")
    }, [])

    return <div id="map" style={{ height: "100%", width: "100%", position: "absolute" }}>
        { children }
    </div>
}

export default Map