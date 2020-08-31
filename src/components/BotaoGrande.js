import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

class BotaoGrande extends Component {
  constructor(props) {
    super(props);
  }

	render() {
    const { backgroundColor, texto, onPress, disabled } = this.props;
		return (
			<TouchableOpacity 
        style={[styles.buttonStyle, {backgroundColor: backgroundColor}]}
        onPress={onPress}
        disabled={disabled}
		  >
        <Text style={styles.textStyle}>
          {texto}
        </Text>
		  </TouchableOpacity>
		);
	}
}

BotaoGrande.propTypes = {
  backgroundColor: PropTypes.oneOf(['#7500CF', '#00E576']),
  texto: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

BotaoGrande.defaultProps = {
  backgroundColor: '#7500CF',
  disabled: false
};

const styles = StyleSheet.create({
  buttonStyle: {
    alignSelf: 'center',
		borderRadius:50,
    height: 45,
    justifyContent: 'center',
    margin: 10,
    width: 330,
	},
	textStyle: {
		color: '#ffffff',
		fontWeight: '500',
    fontSize: 14,
    textAlign: 'center'
  }
});

export default BotaoGrande;