import { View, Text } from "react-native";
import React, { useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDestination,
  selectOrigin,
  setTravelTimeInformation,
} from "../slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { data } from "../data/data";
const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);
  const dispatch = useDispatch();

  const correctPostion = () => {
    if (!origin || !destination) return;

    setTimeout(() => {
      mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }, 10);
  };

  useEffect(() => {
    correctPostion();
  }, [origin, destination]);

  useEffect(() => {
    if (!origin || !destination) return;
    const get_Traver_expense = async () => {
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`
      )
        .then((res) => res.json())
        .then((data) =>
          dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
        );
    };
    get_Traver_expense();
  }, [origin, destination]);
  return (
    <MapView
      ref={mapRef}
      className="flex-1"
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={5}
          strokeColor="hotpink"
        />
      )}
      {origin?.location && destination?.location && (
        <Marker
          coordinate={{
            latitude: origin ? origin.location.lat : 0,
            longitude: origin ? origin.location.lng : 0,
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
        />
      )}
      {origin?.location && destination?.location && (
        <Marker
          coordinate={{
            latitude: destination ? destination.location.lat : 0,
            longitude: destination ? destination.location.lng : 0,
          }}
          title="Destination"
          description={destination.description}
          identifier="destination"
        />
      )}
    </MapView>
  );
};

export default Map;
