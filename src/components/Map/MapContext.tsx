import { createContext } from "react"
import Map from 'ol/map'

const MapContext = createContext<Map | null>(null)
export default MapContext