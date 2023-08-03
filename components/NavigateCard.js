import { View, Text, TouchableOpacity } from "react-native";
import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination } from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";
import { XCircleIcon } from "react-native-heroicons/solid";
import NavFavour from "./navFavour";
import { Icon } from "react-native-elements";

const NavigateCard = () => {
  const dispatch = useDispatch();
  const googlePlaceAutoCompleteRefanother = useRef(null);
  const navigation = useNavigation();
  return (
    <SafeAreaView className="bg-white flex-1">
      <Text className="text-center py-5 text-xl">Good Morning , Thanzeer</Text>
      <View className="border-t border-gray-200 flex-shrink">
        <View>
          <GooglePlacesAutocomplete
            styles={{
              container: {
                backgroundColor: "white",
                paddingTop: 20,
                flex: 0,
              },
              textInput: {
                backgroundColor: "#DDDDDF",
                borderRadius: 0,
                fontSize: 18,
                paddingRight: 30,
              },
              textInputContainer: { paddingBottom: 0, paddingHorizontal: 20 },
            }}
            renderRightButton={() => (
              <View className="absolute right-5 top-3 z-10">
                <XCircleIcon
                  color="black"
                  onPress={() => {
                    googlePlaceAutoCompleteRefanother.current?.setAddressText(
                      ""
                    );
                    dispatch(setDestination(null));
                  }}
                />
              </View>
            )}
            placeholder="Where to?"
            debounce={400}
            fetchDetails={true}
            enablePoweredByContainer={false}
            onPress={(data, detals = null) => {
              dispatch(
                setDestination({
                  location: detals.geometry.location,
                  description: data.description,
                })
              );
              navigation.navigate("RideOptionsCard");
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "en",
            }}
          />
        </View>
        <NavFavour />
      </View>
      <View className="flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100">
        <TouchableOpacity
          onPress={() => navigation.navigate("RideOptionsCard")}
          className="bg-black flex-row w-24 px-4 rounded-full py-3 items-center justify-between"
        >
          <Icon name="car" type="font-awesome" color="white" size={16} />
          <Text className="text-white text-center">Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity className="justify-between flex-row w-24 px-4 rounded-full py-3 items-center space-x-2">
          <Icon
            name="fast-food-outline"
            type="ionicon"
            color="black"
            size={16}
          />
          <Text className=" text-center">Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;
