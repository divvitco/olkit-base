import { useContext } from 'react'
import MapContext from '../components/Map/MapContext'
import Map from "ol/Map"

/**
 * Used to get the map when called inside MapProvider
 * @function
 * @since 0.0.0
 * @returns {Map} A reference to the openlayers map object
 */
export const useMapContext = (): Map | null => useContext(MapContext)