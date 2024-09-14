import { useEffect } from 'react';
import L from 'leaflet';
import { useMap } from 'react-leaflet';

function Legend() {
  const map = useMap();

  useEffect(() => {
    const legend = L.control({ position: 'bottomright' });

    legend.onAdd = function() {
      const div = L.DomUtil.create('div', 'info legend');
      div.innerHTML +=
        '<b><i style="color:white;background: red ; padding:10px">Notice</i><span style="background: white; padding:10px"> Scoll by the sides to leave map</span></b><br>';
        //'{{--<i style="background: blue">wwwe</i> Blue Marker<br>--}}';
      return div;
    };

    legend.addTo(map);

    return () => {
      legend.remove();
    };
  }, [map]);

  return null;
}

export default Legend;
