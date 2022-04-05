import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import firebase from "firebase/compat/app";
import Marker from "./Marker";
import Create from "./Create";
import SelectPlace from "./SelectPlace";

// GoogleMapAPIキー
const APIKEY = "YouAPIKey";

const Maps = () => {
  // ズームレベルの初期値
  const zoomLevel = 13;
  // デフォルトで原宿駅を表示
  const [center, setCenter] = useState({
    lat: 35.67021743017563,
    lng: 139.70251782682953,
  });
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  // firebaseからデータ取得
  const [values, loading, error] = useCollectionData(
    firebase.firestore().collection("vintage-map"),
    { idField: "id" }
  );
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  // GoogleMapの機能利用
  const handleApiLoaded = (map, maps) => {
    map.setOptions({
      zoomControlOptions: {
        position: maps.ControlPosition.RIGHT_TOP,
      },
    });
  };

  // 選択した座標の緯度・経度を取得
  const setLatLng = ({ x, y, lat, lng, event }) => {
    setLat(lat);
    setLng(lng);
  };

  return (
    <div style={{ height: "540px", width: "100%" }}>
      <Create selectLat={lat} selectLng={lng} />
      <GoogleMapReact
        bootstrapURLKeys={{ key: APIKEY }}
        center={center}
        defaultZoom={zoomLevel}
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        onClick={setLatLng}
      >
        {values.map((item) => (
          <Marker
            key={item.name}
            lat={item.lat}
            lng={item.lng}
            name={item.name}
            taste={item.taste}
            insta={item.insta}
            user={item.user}
          />
        ))}
        <SelectPlace lat={lat} lng={lng} />
      </GoogleMapReact>
    </div>
  );
};

export default Maps;
