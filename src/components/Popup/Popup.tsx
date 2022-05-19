import Map from "ol/Map"
import { FeatureLike } from "ol/Feature"
import React, { useState, useEffect, useRef, ReactElement } from "react"
import PopupContext, { PopupClickDetails } from "./PopupContext"
import MapEvent from "ol/MapBrowserEvent"
import { useMapContext } from "../../utils"

export interface PopupProps {
    /** 
     * Contents of the popup
     */
    children: ReactElement,
    /**
     * Type of event that fires the popup
     */
    eventTrigger: "click" | "singleclick" | "pointermove" | "dblclick",
    /**
     * Callback fired on map clicks
     */
    onMapEvent: (data: PopupClickDetails) => Promise<void>,
}

const Popup: React.FC<PopupProps> = (props) => {
    const { children, eventTrigger = "click", onMapEvent = () => {} } = props
    const map = useMapContext()
    const childRef = useRef(null)

    const [ popupInfo, setPopupInfo ] = useState<PopupClickDetails>({ features: [], location: { pixel: null, coordinates: null } })

    const handleMapClick = (info: PopupClickDetails) => {
        const allSystemsGo = () => {
            setPopupInfo(info)
        }
        const initCallback = onMapEvent(info)
        // if onMapInit prop returns a promise, render children after promise is resolved
        const isPromise = !!initCallback && typeof initCallback.then === "function"
  
        isPromise
          ? initCallback
            .catch(e => console.error("Error caught in \"onMapInit\"", e))
            .finally(allSystemsGo)
          : allSystemsGo()
    }

    useEffect(() => {
        const eventHandler = (map: Map) => (event: MapEvent<MouseEvent>) => {
            const features: Array<FeatureLike> = []

            map.forEachFeatureAtPixel(event.pixel, function(feature, layer) {
                features.push(feature)
            });

            handleMapClick({
                features,
                location: {
                    pixel: event.pixel,
                    coordinates: event.coordinate
                }
            })
        }
        map?.on(eventTrigger, eventHandler(map))

        return () => {
            map?.un(eventTrigger, eventHandler(map))
        }
    }, [])


    const updatedChildren = React.cloneElement(children, { ref: childRef, details: popupInfo })

    return <PopupContext.Provider value={popupInfo}>
        { updatedChildren }
    </PopupContext.Provider>
}

export default Popup