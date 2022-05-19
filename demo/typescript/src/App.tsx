import React from "react"

const { MapProvider, Map } = require('olkit-core')

function App() {
  return (
    <div className="App">
      <MapProvider>
        <Map />
      </MapProvider>
    </div>
  );
}

export default App;
