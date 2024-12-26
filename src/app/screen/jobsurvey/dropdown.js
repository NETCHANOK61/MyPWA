import React, { useState } from 'react';
import { KeyboardAvoidingView, View, StyleSheet } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import DropDownPicker from 'react-native-dropdown-picker';

const App = (props) => {
  // State for each DropDownPicker
  const [dropdownStates, setDropdownStates] = useState({
    dropdown1: { open: false, value: null },
    dropdown2: { open: false, value: null },
    dropdown3: { open: false, value: null },
    dropdown4: { open: false, value: null },
    dropdown5: { open: false, value: null },
    dropdown6: { open: false, value: null },
  });

  // Function to update dropdown state
  const updateDropdownState = (key, field, value) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [key]: { ...prevState[key], [field]: value },
    }));
  };

  // Sample items for all dropdowns
  const sampleItems = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 },
  ];

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <NativeBaseProvider>
        <View style={styles.container}>
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <DropDownPicker
              key={`dropdown${index}`}
              zIndex={2000 - index * 10} // Adjust zIndex to avoid conflicts
              zIndexInverse={1000 - index * 10}
              open={dropdownStates[`dropdown${index}`].open}
              value={dropdownStates[`dropdown${index}`].value}
              items={sampleItems}
              setOpen={(open) => updateDropdownState(`dropdown${index}`, 'open', open)}
              onSelectItem={(item) => updateDropdownState(`dropdown${index}`, 'value', item.value)}
              placeholder={`Select Option ${index}`}
              style={styles.dropdown}
            />
          ))}
        </View>
      </NativeBaseProvider>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  dropdown: {
    marginBottom: 16,
  },
});

export default App;
