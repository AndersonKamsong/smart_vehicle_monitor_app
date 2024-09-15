import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Maps.css'; // Assuming you have a Maps.css file
import myIconUrl from '../../../assets/image/map/marker-icon.png';
import Legend from './Legend';
// import MapSlider from 'components/Slides/MapSlider';

function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  return null;
}

function Maps({ bracelets }) {
  const [search, setSearch] = useState('');
  const [center, setCenter] = useState([3.861747739262687, 11.520412969319732]);
  const [zoom, setZoom] = useState(13.48);
  const [selectedMarker, setSelectedMarker] = useState(null);

  function getIconSize() {
    const screenWidth = window.innerWidth;
    return screenWidth <= 768 ? [17, 25] : [25, 41];
  }

  const iconSize = getIconSize();
  const defaultIcon = L.icon({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    iconSize: iconSize,
    shadowSize: [41, 41],
    iconAnchor: [iconSize[0] / 2, iconSize[1]],
    shadowAnchor: [12, 41],
    popupAnchor: [1, -20],
  });

  const myCustomIcon = L.icon({
    iconUrl: myIconUrl,
    iconSize: iconSize,
    shadowSize: [41, 41],
    iconAnchor: [iconSize[0] / 2, iconSize[1]],
    shadowAnchor: [12, 41],
    popupAnchor: [1, -20],
  });

  let markers;
  if (bracelets.length > 0) {

    markers = bracelets.map(row => ({
      id: row._id,
      name: row.soldier.name,
      gender: row.soldier.gender,
      group: row.soldier.group,
      rank: row.soldier.rank,
      brac_color: row.brac_color,
      brac_model: row.brac_model,
      status: row.status,
      alert: row.alert,
      position: [row.location.latitude, row.location.longitude]
    }));
  } else {
    markers = []
  }

  const filteredMarkers = markers.filter(marker => marker.name.toLowerCase().includes(search.toLowerCase()));

  const handleChange = (event) => {
    setSearch(event.target.value);
    setSelectedMarker(null);
  };

  const handleClick = (marker) => {
    setSelectedMarker(marker);
    setCenter(marker.position);
    setZoom(16.0);
    setSearch(''); // Reset the search state
  };


  return (
    <div className='map_container'>
      <div className="mapSearch_cont">
        <div className="mapSearch">
          <input type="text" value={search} onChange={handleChange} className='mapSearch_input' placeholder='Search...' />
          {search && (
            <ul style={{
              width: "100%",
              paddingInlineStart: "0px"
            }}>
              {filteredMarkers.length > 0 ? (
                filteredMarkers.map(marker => (
                  <li key={marker.id} onClick={() => handleClick(marker)} className='map_li'>
                    {marker.name.slice(0, 10)}
                  </li>
                )).slice(0, 5)
              ) : (
                <li className='map_li'>{search} does not exist</li>
              )}
            </ul>
          )}
        </div>
      </div>
      <div className="map">
        <MapContainer center={center} zoom={zoom} style={{ height: "100%", width: "100%" }}>
          <ChangeView center={center} zoom={zoom} />
          <TileLayer
            // attribution='&copy; <a href="#">Campusiai.com</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filteredMarkers.map(marker => (
            <Marker
              key={marker.id}
              position={marker.position}
              icon={marker.alert ? myCustomIcon : defaultIcon}
              // icon={selectedMarker && selectedMarker.id === marker.id ? myCustomIcon : defaultIcon}
            >
              <Popup>
                <br /><br />
                <b>Name: {marker.name}</b><br/>
                <b>gender: {marker.gender}</b><br/>
                <b>group: {marker.group}</b><br/>
                <b>rank: {marker.rank}</b>
                <hr/>
                <a href={`/dashboard/bracelet/${marker.id}`} className="map_btn">More...</a>
              </Popup>
              <Tooltip><h5>{marker.name}</h5></Tooltip>
            </Marker>
          ))}
          {/* <Legend /> */}
        </MapContainer>
      </div>
    </div>
  );
}

export default Maps;
