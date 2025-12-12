import FogMap from '../components/FogMap';
import sites from '../data/sites.json'; // Assuming you want to pass these as quests

export default function ExplorerMode() {
  return (
    <div className="h-screen w-full">
      {/* The Fog Map takes up the full container */}
      <FogMap quests={sites} />
    </div>
  );
}