import React, { useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

interface Data {
  label: string;
  value: string;
}
interface Props {
  placeholder?: string;
  data: Data[];
  value: string;
  handleValueChange: (e: string) => void;
}
const CustomDropDown = ({
  placeholder,
  data,
  value,
  handleValueChange,
}: Props) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View className="relative w-full pt-8 bg-transparent">
      <Text className="absolute bg-transparent text-black font-pmedium left-0 top-0 z-[999] text-[14px]">
        {placeholder}
      </Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        containerStyle={styles.container}
        itemTextStyle={styles.textStyle}
        itemContainerStyle={styles.itemContainerStyle}
        data={data}
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? `Select ${placeholder}` : ""}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          handleValueChange(item.value);
          setIsFocus(false);
        }}
        dropdownPosition={
          isFocus ? (Platform.OS === "ios" ? "top" : "auto") : "auto"
        }
      />
    </View>
  );
};

export default CustomDropDown;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 14,
    marginTop: 5,
    overflow: "hidden",
    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
  },
  itemContainerStyle: {
    borderRadius: 14,
    backgroundColor: "white",
  },
  dropdown: {
    height: 50,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 14,
    paddingHorizontal: 8,
    backgroundColor: "white",
  },
  placeholderStyle: {
    fontSize: 14,
    color: "black",
    marginLeft: 10,
    backgroundColor: "white",
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 10,
    color: "black",
  },
  textStyle: {
    color: "black",
  },
});
