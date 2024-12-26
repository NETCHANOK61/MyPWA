import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

export default function CustomDropDown({
  items,
  placeholder = "เลือก",
  onValueChange,
  initialValue = null,
  width = "100%",
  borderColor = "black",
  fontSize,
  fontFamily = "Prompt-Regular",
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(initialValue);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={(itemValue) => {
        console.log(itemValue)
        setValue(itemValue); // อัปเดตค่าใน state
        if (onValueChange) {
          onValueChange(itemValue); // เรียกฟังก์ชันที่ส่งมาจาก props
        }
      }}
      placeholder={placeholder}
      style={{
        width: width,
        borderColor: borderColor,
      }}
      dropDownContainerStyle={{
        borderColor: borderColor,
      }}
    />
  );
}