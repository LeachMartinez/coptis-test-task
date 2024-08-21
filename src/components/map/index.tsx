import { useEffect, useRef } from "react";
import { Map as OlMap, View} from "ol";
import styles from "./map.module.scss";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import * as olProj from 'ol/proj';
import { defaults } from 'ol/interaction/defaults';
import "ol/ol.css";

const Map: React.FC = () => {  
  const mapElement = useRef<HTMLDivElement>(null);
  const mapRef = useRef<OlMap>();

  useEffect(() => {
    if (mapElement.current && mapRef.current) return;
    mapRef.current = new OlMap({
      interactions: defaults({mouseWheelZoom:false}),
      layers: [raster],
      target: mapElement.current || "",
      view
    });
  }, []);

  const proj = olProj.get('EPSG:3857');
  if (proj === null) return;

  const extent = proj.getExtent().slice();
  extent[0] += extent[0];
  extent[2] += extent[2];

  const raster = new TileLayer({
    preload: Infinity,
    source: new OSM(),
  })

  const view = new View({
    center: [11000000, 8600000],
    zoom: 3,
    extent,
  });

  return (
    <div className={styles.map} ref={mapElement}/>
  );
}

export default Map;