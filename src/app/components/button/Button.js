import {Dimensions, TouchableOpacity} from 'react-native';

const tcButton = ({btStyle, labelStyle, label, onPress}) => (
  <TouchableOpacity activeOpacity={0.75} style={btStyle} onPress={onPress}>
    <Text style={labelStyle}>{label}</Text>
  </TouchableOpacity>
);

export default tcButton;
