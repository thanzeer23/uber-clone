import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { data } from "../data/data";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectOrigin } from "../slices/navSlice";

const NavOptions = () => {
  const [data_nav, setdata_nav] = useState(data);
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);
  return (
    <FlatList
      data={data_nav}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate(item.screen)}
          className="p-2 pl-6 pt-4 bg-gray-200 w-40 m-2 items-center"
          disabled={!origin}
        >
          <View>
            <Image
              source={{ uri: item.image }}
              width={120}
              height={120}
              resizeMode="contain"
            />
            <View className="flex-column items-start">
              <Text className="text-center mt-2 text-lg font-semibold">
                {item.title}
              </Text>
              <Icon
                className="p-2 bg-black rounded-full w-10 mt-2"
                type="antdesign"
                color="white"
                name="arrowright"
              />
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;
