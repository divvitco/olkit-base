import olVectorSource from 'ol/source/Vector'
import olStyle from 'ol/style/Style'
import olCircleStyle from 'ol/style/Circle'
import olFill from 'ol/style/Fill'
import olStroke from 'ol/style/Stroke'
import olLayerVector from 'ol/layer/Vector'
import Map from 'ol/Map'
import GeoJSON from 'ol/format/GeoJSON'
import KML from 'ol/format/KML'
import Feature from 'ol/Feature'
import { Geometry } from 'ol/geom'

const getFeaturesFromDataSet = (map: Map, dataSet: URL): Array<Feature<Geometry>> => {
  const mapProjection = map.getView().getProjection().getCode()
  const opts = { featureProjection: mapProjection }

  try {
    const geoJson = new GeoJSON(opts)
    const features = geoJson.readFeatures(dataSet)

    return features
  } catch (e) { /* must not be JSON */ }
  try {
    const kml = new KML({ extractStyles: false })
    const features = kml.readFeatures(dataSet, opts)

    return features
  } catch (e) { /* must not be KML */ }

  // not a supported data format, return empty features array
  return []
}

const urlValidator = (string: URL) => {
  try {
    new URL(string) // eslint-disable-line no-new
  } catch (_) {
    return false
  }

  return true
}

/**
 * Async function that loads 
 * @function
 * @since 0.0.0
 * @param {Map} map openlayers map reference - for finding the projection
 * @param {URL} query url pointing to the data set. can be local or remote
 * @returns {olLayerVector} a vector layer - call `map.addLayer` with the response to this function
 */
export const loadDataLayer = async (map: Map, query: URL): Promise<olLayerVector<olVectorSource>> => {
  if (!(map instanceof Map)) throw Error('\'loadDataLayer\' requires a valid openlayers map as the first argument')
  const style = { fill: { color: '#fefefe91' }, stroke: { color: '#3399cd', width: 2 }}
  const opts = { addToMap: true, title: 'Data Layer'}

  // getFeaturesFromDataSet returns empty array if query arg is not a supported data type (ex. url)
  let features = getFeaturesFromDataSet(map, query)
  const isValidUrl = urlValidator(query)

  if (!features.length && isValidUrl) {
    // query is an endpoint to fetch valid data set
    let response

    try {
      const request = await fetch(query.toString())

      response = await request.text() // either xml or json
    } catch (e) {
      throw Error(`'loadDataLayer' error when making network request: ${e}`)
    }

    let dataSet

    try {
      // geojson
      dataSet = JSON.parse(response)
    } catch (e) {
      // kml
      const parser = new DOMParser()

      dataSet = parser.parseFromString(response, 'text/xml')
    }

    features = getFeaturesFromDataSet(map, dataSet)
  } else if (!features.length) {
    // catch malformed queries here
    throw Error(`'loadDataLayer' recieved invalid query: '${query}' as second argument`)
  }

  // create the layer and add features
  const source = new olVectorSource()
  const layer = new olLayerVector({ source })

  // set attribute for LayerPanel title
  layer.set('title', opts.title)

  source.addFeatures(features)

  // style based on opts
  layer.setStyle(
    new olStyle({
      fill: new olFill(style.fill),
      stroke: new olStroke(style.stroke),
      image: new olCircleStyle({
        radius: 4,
        fill: new olFill(style.fill),
        stroke: new olStroke(style.stroke)
      })
    })
  )

  return layer
}