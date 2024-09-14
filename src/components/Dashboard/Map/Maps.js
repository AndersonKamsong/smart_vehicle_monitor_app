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

function Maps({ }) {
  const centers = [
  {
    _id: "center1",
    centerImage: ["center1_img1.jpg", "center1_img2.jpg"],
    centerName: "Etoudi Presidential Palace",
    centerHead: "President Paul Biya",
    email: ["presidency@cameroon.gov.cm"],
    Desc: "The official residence of the President of Cameroon.",
    phone: ["+237 22 23 23 23"],
    position: [{ latitude: 3.8715, longitude: 11.4991 }],
  },
  {
    _id: "center2",
    centerImage: ["center2_img1.png"],
    centerName: "Achouya Market",
    centerHead: "Market Manager",
    email: ["achouya_market@gmail.com"],
    Desc: "A bustling market in Yaoundé.",
    phone: ["+237 69 00 00 00"],
    position: [{ latitude: 3.8659, longitude: 11.4905 }],
  },
  {
    _id: "center3",
    centerImage: ["center3_img1.jpg", "center3_img2.jpg", "center3_img3.jpg"],
    centerName: "Cameroon National Museum",
    centerHead: "Museum Director",
    email: ["museum@cameroon.gov.cm"],
    Desc: "A museum showcasing Cameroon's history and culture.",
    phone: ["+237 22 23 45 67"],
    position: [{ latitude: 3.8612, longitude: 11.4873 }],
  },
  // ... add more centers with specific locations in Yaoundé
];
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
  if (centers.length > 0) {

    markers = centers.map(row => ({
      id: row._id,
      img: row.centerImage.map(img => `${process.env.REACT_APP_API_URL}/../center/${row._id}/${img}`),
      name: row.centerName,
      head: row.centerHead,
      email: row.email[0],
      description: row.Desc,
      tel1: row.phone[0],
      position: [row.position[0].latitude, row.position[0].longitude]
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
                    {marker.name.slice(0,10)}
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
              icon={selectedMarker && selectedMarker.id === marker.id ? myCustomIcon : defaultIcon}
            >
              <Popup>
                {/* <div style={{textAlign:"center",margin:"auto"}}>
                  <MapSlider img={marker.img} /></div> */}
                <br /><br />
                <b>Name: {marker.name}</b>
                <h4>{marker.head}</h4>
                <h4>Description:</h4>
                <span className='description'>{marker.description}</span>
                <br /><br />
                <b>Contact:</b>
                <br />
                email: <a href={`mailto:${marker.email}`}>{marker.email}</a>
                <br />
                {marker.tel1 && <span>Tel 1: <a href={`tel:${marker.tel1}`}>{marker.tel1}</a></span>}
                <br />
                <a href={`geo:${marker.position}`} className="map_btn">Open in Maps</a>
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
