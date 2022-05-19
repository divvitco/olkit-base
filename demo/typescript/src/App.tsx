import React from "react"
import OlMap from "ol/Map"

const { MapProvider, Map, loadDataLayer } = require('@olkit/core')

function App() {
  const onMapInit = (map: OlMap): void => {
    window.map = map // nice to have for debugging purposes

    const layer = loadDataLayer(map, "https://data.nasa.gov/api/geospatial/7zbq-j77a?method=export&format=KML")
  }

  return (
    <div className="App">
      <MapProvider onMapInit={onMapInit}>
        <Map />
      </MapProvider>
    </div>
  );
}

export default App;
