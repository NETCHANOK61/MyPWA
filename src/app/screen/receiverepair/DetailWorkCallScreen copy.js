// DetailWorkCallScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const DetailWorkCallScreen = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "English", value: "en" },
    { label: "Deutsch", value: "de" },
    { label: "French", value: "fr" },
  ]);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />
  );
};

export default DetailWorkCallScreen;
