import React from 'react';
import Map, { Marker } from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const FogMap = () => {
  // Hampi Coordinates
  const START_LOCATION = {
    longitude: 76.4600,
    latitude: 15.3350
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1, backgroundColor: '#e5e7eb' }}>
      <Map
        mapLib={maplibregl}
        initialViewState={{
          ...START_LOCATION,
          zoom: 14
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle={{
          version: 8,
          sources: {
            osm: {
              type: 'raster',
              tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
              tileSize: 256,
              attribution: '&copy; OpenStreetMap Contributors'
            }
          },
          layers: [
            {
              id: 'osm',
              type: 'raster',
              source: 'osm',
              minzoom: 0,
              maxzoom: 22
            }
          ]
        }}
      >
        <Marker longitude={START_LOCATION.longitude} latitude={START_LOCATION.latitude} color="red" />
      </Map>
    </div>
  );
};

export default FogMap;