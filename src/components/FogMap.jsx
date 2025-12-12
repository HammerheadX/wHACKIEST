import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const FogMap = ({ quests }) => {
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);
  const canvasRef = useRef(null);
  
  // We store "visited" points as simple Lat/Lng arrays
  // Example: [[77.59, 12.97], [77.60, 12.98]...]
  const [visitedPath, setVisitedPath] = useState([]);
  const [visibleQuests, setVisibleQuests] = useState([]);

  // 1. Initialize Map
  useEffect(() => {
    if (mapInstance.current) return;

    mapInstance.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [77.5946, 12.9716],
      zoom: 15,
    });

    mapInstance.current.on('load', () => {
      // Trigger initial draw
      drawFog();
    });

    // REDRAW FOG WHENEVER MAP MOVES
    // This keeps the fog synced with the map location
    mapInstance.current.on('move', drawFog);
    mapInstance.current.on('zoom', drawFog);
    mapInstance.current.on('resize', () => {
        resizeCanvas();
        drawFog();
    });
    
    // Initial canvas sizing
    resizeCanvas();

    return () => mapInstance.current.remove();
  }, []);

  // 2. Track User & Update Path
  useEffect(() => {
    // Mock user movement
    const interval = setInterval(() => {
        // Simulate slight movement
        const newLat = 12.9716 + (Math.random() - 0.5) * 0.005;
        const newLng = 77.5946 + (Math.random() - 0.5) * 0.005;
        
        const newPoint = [newLng, newLat];

        // Add to path history
        setVisitedPath(prev => [...prev, newPoint]);

        // Check for quests nearby
        checkQuestProximity(newPoint);
        
        // Force a redraw
        drawFog();
    }, 1000);

    return () => clearInterval(interval);
  }, [quests]); // Dependencies

  // Helper: Resize canvas to match map container
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    const container = mapContainer.current;
    if (canvas && container) {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    }
  };

  // 3. THE MAGIC: Drawing the Fog
  const drawFog = () => {
    const map = mapInstance.current;
    const canvas = canvasRef.current;
    if (!map || !canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // A. Reset Canvas
    ctx.clearRect(0, 0, width, height);

    // B. Fill entire screen with Fog (Black with opacity)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.85)'; // 85% opacity black
    ctx.fillRect(0, 0, width, height);

    // C. Set "Erase" Mode
    // 'destination-out' removes existing pixels (punches holes)
    ctx.globalCompositeOperation = 'destination-out';

    // D. Draw a soft circle for every visited point
    // Note: In a real app, you might want to optimize this loop if points > 1000
    visitedPath.forEach(coord => {
        // Convert Lat/Lng to Screen X/Y pixels
        const screenPoint = map.project(coord);
        
        // Setup Radial Gradient for "Soft Edge"
        // Inner circle is fully transparent (clear view)
        // Outer circle fades into the fog
        const radius = 60; // Size of the clear area
        const gradient = ctx.createRadialGradient(
            screenPoint.x, screenPoint.y, 10,  // Inner circle
            screenPoint.x, screenPoint.y, radius // Outer circle
        );
        gradient.addColorStop(0, 'rgba(0, 0, 0, 1)'); // Full erase at center
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)'); // No erase at edge

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(screenPoint.x, screenPoint.y, radius, 0, Math.PI * 2);
        ctx.fill();
    });

    // Reset composite operation for next frame
    ctx.globalCompositeOperation = 'source-over';
  };

  // 4. Logic: Simple Distance Check
  const checkQuestProximity = (userLoc) => {
    if(!quests) return;
    
    // Simple math to check distance (approximate)
    // 0.0005 degrees is roughly 50 meters
    const detectionRange = 0.0005; 

    const found = quests.filter(q => {
        const distLat = Math.abs(q.lat - userLoc[1]);
        const distLng = Math.abs(q.lng - userLoc[0]);
        return (distLat < detectionRange && distLng < detectionRange);
    });

    // Merge with already found quests
    setVisibleQuests(prev => {
        const ids = new Set(prev.map(p => p.id));
        const newFinds = found.filter(f => !ids.has(f.id));
        return [...prev, ...newFinds];
    });
  };

  return (
    <div className="relative w-full h-full">
      {/* 1. Map Layer */}
      <div ref={mapContainer} className="absolute inset-0 z-0" />
      
      {/* 2. Canvas Overlay (Pointer events none allows clicking through to map) */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-10 pointer-events-none"
      />

      {/* 3. Quest UI */}
      <div className="absolute top-4 left-4 z-20 bg-white p-4 rounded shadow">
         <h2 className="font-bold">Quests Unlocked: {visibleQuests.length}</h2>
      </div>
    </div>
  );
};

export default FogMap;