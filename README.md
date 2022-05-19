# @olkit/core

A [ReactJS](https://reactjs.org/) component library extending [OpenLayers](https://openlayers.org/)

## Usage

### Installing

You'll need to install `@olkit/core` and some of its peer dependencies:

**With NPM:**

```terminal
npm i @olkit/core ol
```

### Implementing 

Making a map and adding data is easy, just a few lines of code:

```jsx
import React from 'react'
import { MapProvider, Map, loadDataLayer } from '@olkit/core'

const App = () => {
    const onMapInit = async (map) => {
        const dataURL = 'https://data.nasa.gov/api/geospatial/7zbq-j77a?method=export&format=KML'
        const usStateLayer = await loadDataLayer(map, dataURL)
        usStateLayer.set('title', 'US States') // Just for fun
        map.addLayer(usStateLayer)
    }

    return (
        <MapProvider onMapInit={onMapInit}>
            <Map />
        </MapProvider>
    )
}
```

## LICENSE

MIT License

Copyright (c) 2022 Divvitco

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
