import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

interface Data {
  label: string;
  value: string;
}
const data: Data[] = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];
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
  //   const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text className="absolute bg-transparent text-black font-pmedium left-0 top-0 z-[999] text-[14px]">
          {placeholder}
        </Text>
      );
    }
    return null;
  };

  return (
    <View className="relative w-full pt-8 bg-transparent">
      {renderLabel()}
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
        placeholder={!isFocus ? `Select ${placeholder}` : "Select item"}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          handleValueChange(item.value);
          setIsFocus(false);
        }}
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
