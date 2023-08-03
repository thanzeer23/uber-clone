import { View, Text, SafeAreaView, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import GlobalStyle from "../Globalstyles/GlobalStyle";
import NavOptions from "../components/navOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice";
import { XCircleIcon } from "react-native-heroicons/solid";
import NavFavour from "../components/navFavour";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const googlePlaceAutoCompleteRef = useRef(null);

  return (
    <SafeAreaView style={GlobalStyle.AndroidSafeArea}>
      <View className="p-5 relative">
        <Image
          width={100}
          height={100}
          resizeMode="contain"
          source={{
            uri: "https://links.papareact.com/gzs",
          }}
        />
        <GooglePlacesAutocomplete
          ref={googlePlaceAutoCompleteRef}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          placeholder="Where From?"
          minLength={2}
          returnKeyType={"default"}
          renderRightButton={() => (
            <View className="absolute right-1 top-3 z-10">
              <XCircleIcon
                color="black"
                onPress={() => {
                  googlePlaceAutoCompleteRef.current?.setAddressText("");
                  dispatch(setOrigin(null));
                }}
              />
            </View>
          )}
          enablePoweredByContainer={false}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
          fetchDetails={true}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );

            dispatch(setDestination(null));
          }}
          styles={{
            container: {
              flex: 0,
              padding: 5,
            },

            textInput: {
              fontSize: 18,

              paddingRight: 40,
            },
          }}
        />

        <NavOptions />
        <NavFavour />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
