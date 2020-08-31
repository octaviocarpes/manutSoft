import React from 'react';
import PropTypes from 'prop-types';
import { View, Text} from 'react-native';
import { TextField } from 'react-native-material-textfield';

const InputSenha = ({ 
  disabled,
  label,
  max,
  multiline,
  onChangeText,
  style,
  value,
  placeholder
 }) =>
    <View style={style}>
      <TextField
        baseColor={"#8400C5"}
        characterRestriction={max}
        disabled={disabled}
        label={label}
        labelFontSize={14}
        multiline={multiline}
        onChangeText={value => onChangeText(value)}
        placeholder={placeholder}
        tintColor={"#8400C5"}
        textColor="#000000"
        value={value}
        secureTextEntry={true}
      />
    </View>

export default InputSenha;

InputSenha.propTypes = {
  disabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  label: PropTypes.string.isRequired,
  max: PropTypes.number,
  multiline: PropTypes.bool,
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  style: Text.propTypes.style,
  value: PropTypes.string.isRequired
}

InputSenha.defaultProps = {
  disabled: false,
  isRequired: false,
  max: undefined,
  multiline: false,
  placeholder: '',
  style: ''
}
