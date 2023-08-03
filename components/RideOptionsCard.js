import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { UserCars } from "../data/UberCars";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setselected] = useState(null);
  const timeTravelInfo = useSelector(selectTravelTimeInformation);
  const SURGE_CHARGE_RATE = 1.5;

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="">
        <View>
          <TouchableOpacity
            className="absolute z-10 top-3 left-5 rounded-full"
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Icon name="chevron-left" type="fontawesome" />
          </TouchableOpacity>
        </View>
        <Text className="text-center py-5 text-xl">
          Select a Ride - {timeTravelInfo?.duration?.text}
        </Text>
      </View>
      <FlatList
        data={UserCars}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setselected(item)}
            className={`${
              item?.id === selected?.id && "bg-gray-200"
            } ${"flex-row items-center justify-between px-10"}`}
          >
            <Image
              style={{ width: 100, height: 100 }}
              resizeMode="contain"
              source={{ uri: item.image }}
            />
            <View className="-ml-2 text-center">
              <Text className="text-xl font-semibold">{item.title}</Text>
              <Text>{timeTravelInfo?.duration?.text} Travel time ...</Text>
            </View>
            <Text className="text-xl">
              {new Intl.NumberFormat("en-inr", {
                style: "currency",
                currency: "inr",
              }).format(
                (timeTravelInfo?.duration?.value *
                  SURGE_CHARGE_RATE *
                  item.multiplier) /
                  100
              )}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View>
        <TouchableOpacity
          disabled={!selected}
          className={`${"items-center bg-black py-3 m-3"} ${
            !selected && "bg-gray-200"
          }`}
        >
          <Text className="text-xl text-white">choose {selected?.title}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;
