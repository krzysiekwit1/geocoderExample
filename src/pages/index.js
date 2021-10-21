import * as React from 'react'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useEffect } from 'react'
import '../styles/index.css'
import MapboxWorker from 'mapbox-gl/dist/mapbox-gl-csp-worker';

mapboxgl.accessToken = 'pk.eyJ1Ijoia3J6eXNpZWt3aXQiLCJhIjoiY2t1eHhraTMwMzRvZDJwcXIxM3c1a3c1OSJ9.KBCERL0NTvMfr1t9vsmwEg'

const IndexPage = () => {

  useEffect(() => {
    mapboxgl.workerClass = MapboxWorker;

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [13.404954, 52.520008],
      zoom: 9
    })
    map.on('load', () => {
      map.addSource('maine', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'geometry': {
            'type': 'Polygon',
            'coordinates': [
              [
                [
                  13.164975,
                  52.601712
                ],
                [
                  13.153884,
                  52.577705
                ],
                [
                  13.158736,
                  52.515311
                ],
                [
                  13.19825,
                  52.515733
                ],
                [
                  13.220433,
                  52.509405
                ],
                [
                  13.20033,
                  52.488303
                ],
                [
                  13.203103,
                  52.470991
                ],
                [
                  13.19617,
                  52.453674
                ],
                [
                  13.186465,
                  52.438885
                ],
                [
                  13.206569,
                  52.422399
                ],
                [
                  13.32095,
                  52.414789
                ],
                [
                  13.374328,
                  52.449871
                ],
                [
                  13.423546,
                  52.454096
                ],
                [
                  13.4998,
                  52.428741
                ],
                [
                  13.547632,
                  52.408446
                ],
                [
                  13.576054,
                  52.45832
                ],
                [
                  13.558724,
                  52.49168
                ],
                [
                  13.65924,
                  52.493368
                ],
                [
                  13.670332,
                  52.526279
                ],
                [
                  13.670332,
                  52.555372
                ],
                [
                  13.669639,
                  52.58276
                ],
                [
                  13.604476,
                  52.601291
                ],
                [
                  13.571202,
                  52.586972
                ],
                [
                  13.542086,
                  52.601291
                ],
                [
                  13.481083,
                  52.621076
                ],
                [
                  13.419387,
                  52.607185
                ],
                [
                  13.329268,
                  52.626968
                ],
                [
                  13.292528,
                  52.608448
                ],
                [
                  13.21558,
                  52.6135
                ],
                [
                  13.164975,
                  52.601712
                ]
              ]
            ]
          }
        }
      })
    })
    const loadColorOnPolygon = () => {
      if (map.isStyleLoaded()) {
        map.addLayer({
          'id': 'maine',
          'type': 'fill',
          'source': 'maine', // reference the data source
          'layout': {},
          'paint': {
            'fill-color': '#0080ff', // blue color fill
            'fill-opacity': 0.5
          }
        })
        map.addLayer({
          'id': 'outline',
          'type': 'line',
          'source': 'maine',
          'layout': {},
          'paint': {
            'line-color': '#000',
            'line-width': 3
          }
        })

      }
      const marker1 = new mapboxgl.Marker()
        .setLngLat([13.204954, 52.520008])
        .addTo(map)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              `<h3>Location 1</h3><p>headquarters</p>`
            )
        )

      const marker2 = new mapboxgl.Marker()
        .setLngLat([13.404954, 52.480008])
        .addTo(map)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              `<h3>Location 2</h3><p>headquarters2</p>`
            )
        )
    }

    const loadMarkerForGeocoder = () => {
      if (!map.getSource('single-point-geocoder')) {
        map.addSource('single-point-geocoder', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: []
          }
        })
        const layerGeoCoder = map.addLayer({
          id: 'pointForGeoCoder',
          source: 'single-point-geocoder',
          type: 'circle',
          paint: {
            'circle-radius': 10,
            'circle-color': '#448ee4'
          }
        })
      }
    }
    map.on('data', loadColorOnPolygon)
    map.on('data', loadMarkerForGeocoder)

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: true,
      placeholder: 'Search for places in Berkeley',
    })
    geocoder.on('result', (event) => {
      map.getSource('single-point-geocoder').setData(event.result.geometry)
    })
    map.addControl(geocoder)

  }, [])

  return (
    <div>
      <div id='map' style={{ height: '100vh', width: '100vw' }}>
      </div>
    </div>

  )
}

export default IndexPage
