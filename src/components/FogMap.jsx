import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import * as turf from '@turf/turf'; // Make sure you ran: npm install @turf/turf
import { Navigation, Map as MapIcon } from 'lucide-react';

const FogMap = ({ quests }) => {
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);
  
  // 📍 LOCATIONS & SETTINGS
  const HAMPI_LOCATION = [76.4600, 15.3350]; 
  const FOG_COLOR = '#000000';
  const FOG_OPACITY = 0.85;
  const VISIBILITY_RADIUS_KM = 2.5; // Total 5km wide circle

  // State for the "Cleared Area" (A GeoJSON Polygon)
  const [clearedArea, setClearedArea] = useState(null);
  const [userLocation, setUserLocation] = useState(HAMPI_LOCATION);

  // 1. Initialize Map
  useEffect(() => {
    if (mapInstance.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          'osm': {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '&copy; OpenStreetMap Contributors',
          }
        },
        layers: [
          {
            id: 'osm',
            type: 'raster',
            source: 'osm',
          }
        ]
      },
      center: HAMPI_LOCATION,
      zoom: 12,
    });

    mapInstance.current = map;

    map.on('load', () => {
      // A. Add the User Marker
      const el = document.createElement('div');
      el.className = 'w-6 h-6 bg-orange-500 rounded-full border-4 border-white shadow-xl z-50';
      new maplibregl.Marker({ element: el })
        .setLngLat(HAMPI_LOCATION)
        .addTo(map);

      // B. Add the Fog Source (Initially empty)
      map.addSource('fog-mask', {
        type: 'geojson',
        data: getWorldMask(null) // Start with full fog
      });

      // C. Add the Fog Layer
      map.addLayer({
        id: 'fog-layer',
        type: 'fill',
        source: 'fog-mask',
        layout: {},
        paint: {
          'fill-color': FOG_COLOR,
          'fill-opacity': FOG_OPACITY
        }
      });

      // D. Initialize the "Cleared Area" at start position
      updateClearedZone(HAMPI_LOCATION);
    });

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  // 2. Simulate Walking (Game Loop)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!mapInstance.current) return;

      setUserLocation(prev => {
        // Move slightly (Simulation)
        const newLat = prev[1] + (Math.random() - 0.5) * 0.003;
        const newLng = prev[0] + (Math.random() - 0.5) * 0.003;
        const newLoc = [newLng, newLat];

        // Update the cleared zone based on new location
        updateClearedZone(newLoc);
        
        return newLoc;
      });
    }, 1500); // Move every 1.5 seconds

    return () => clearInterval(interval);
  }, [clearedArea]); // Dependency ensures we merge with LATEST clearedArea

  // --- CORE LOGIC: Vector "Hole Punching" ---
  const updateClearedZone = (currentLoc) => {
    const map = mapInstance.current;
    if (!map || !map.getSource('fog-mask')) return;

    // 1. Create a circle around the user (The "Torch")
    const visibilityCircle = turf.circle(currentLoc, VISIBILITY_RADIUS_KM, { 
      steps: 64, // Smoothness of circle
      units: 'kilometers' 
    });

    // 2. Merge this circle with previously cleared areas
    let newClearedArea;
    if (clearedArea) {
      newClearedArea = turf.union(turf.featureCollection([clearedArea, visibilityCircle]));
    } else {
      newClearedArea = visibilityCircle;
    }

    setClearedArea(newClearedArea);

    // 3. Calculate "World MINUS ClearedArea"
    // This creates the shape with holes in it
    const fogGeoJSON = getWorldMask(newClearedArea);
    
    // 4. Update the map source
    map.getSource('fog-mask').setData(fogGeoJSON);
  };

  // Helper: Returns a Giant Polygon (World) with the 'mask' cut out of it
  const getWorldMask = (maskPoly) => {
    // A polygon covering the whole world
    const world = turf.polygon([[
      [-180, -90],
      [180, -90],
      [180, 90],
      [-180, 90],
      [-180, -90]
    ]]);

    if (!maskPoly) return world;

    try {
      return turf.difference(turf.featureCollection([world, maskPoly]));
    } catch (e) {
      console.error("Turf Error:", e);
      return world;
    }
  };

  // --- CONTROLS ---
  const flyToUser = () => {
    mapInstance.current?.flyTo({ center: userLocation, zoom: 13 });
  };

  const flyToHampi = () => {
    mapInstance.current?.flyTo({ center: HAMPI_LOCATION, zoom: 13 });
  };

  return (
    <>
      <div 
        ref={mapContainer} 
        className="fixed inset-0 w-full h-full z-0 bg-black" 
      />

      {/* Controls */}
      <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 flex gap-4">
        <button 
          onClick={flyToUser}
          className="flex items-center gap-2 px-6 py-3 bg-brand-accent text-white rounded-full shadow-lg hover:scale-105 transition font-bold border-2 border-white"
        >
          <Navigation size={18} fill="currentColor" />
          My Location
        </button>

        <button 
          onClick={flyToHampi}
          className="flex items-center gap-2 px-6 py-3 bg-brand-dark text-white rounded-full shadow-lg hover:scale-105 transition font-bold border-2 border-white"
        >
          <MapIcon size={18} />
          Hampi Site
        </button>
      </div>
      
      {/* UI Overlay */}
      <div className="fixed top-28 left-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-white/50 w-72">
        <h2 className="font-bold text-brand-dark text-lg">Wanderer Mode</h2>
        <p className="text-xs text-gray-600 mt-1">
          Fog is persistent. Areas you explore stay revealed.
        </p>
      </div>
    </>
  );
};

export default FogMap;