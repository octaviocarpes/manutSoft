import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

class BotaoMedio extends Component {
  constructor(props) {
    super(props);
  }

	render() {
    const { backgroundColor, texto, onPress, style } = this.props;

		return (
			<TouchableOpacity 
        style={[styles.buttonStyle, {backgroundColor: backgroundColor}, style]}
				onPress={onPress}
		  >
        <Text style={styles.textStyle}>
          {texto}
        </Text>
		  </TouchableOpacity>
		);
	}
}

BotaoMedio.propTypes = {
  backgroundColor: PropTypes.oneOf(['#7500CF', '#00E576']),
  texto: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.style
};

BotaoMedio.defaultProps = {
  backgroundColor: '#7500CF',
  style: undefined
};

const styles = StyleSheet.create({
  buttonStyle: {
    alignSelf: 'center',
		borderRadius:35,
    height: 60,
    justifyContent: 'center',
    margin: 10,
    width: 210,
	},
	textStyle: {
		color: '#ffffff',
		fontWeight: '500',
    fontSize: 14,
    textAlign: 'center'
  }
});

export default BotaoMedio;