import { createContext } from "react"
import { FeatureLike } from "ol/Feature"

export interface PopupClickDetails {
    /**
     * A list of openlayers features under the click event
     */
    features: Array<FeatureLike>,
    /**
     * Location information around the click event
     */
    location: {
        /**
         * The canvas pixel location of the click, useful for positioning the popup
         */
        pixel: Array<number> | null,
        /**
         * The openlayers coordinate of the mouse click
         */
        coordinates: Array<number> | null,
    },
}

const PopupContext = createContext<PopupClickDetails | null>(null)
export default PopupContext