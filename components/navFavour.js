import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { data2 } from "../data/data2";
import { Icon } from "react-native-elements";

const NavFavour = () => {
  return (
    <FlatList
      data={data2}
      ItemSeparatorComponent={() => <View className="bg-gray-200 h-[0.5]" />}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity className="flex-row items-center p-5">
          <Icon
            className="mr-4 rounded-full bg-gray-300 p-3"
            name={item.icon}
            type="ionicon"
            color="white"
            size={18}
          />
          <View>
            <Text className="font-semibold text-lg">{item.location}</Text>
            <Text className="text-gray-500 ">{item.destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavFavour;
