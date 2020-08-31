import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

const BotaoRemoveAlternativa = ({ onPress }) => (
  <TouchableOpacity
    style={styles.button}
    onPress={onPress}
  >
    <Icon style={styles.icon} 
      name="ios-remove-circle" size={20} 
      color="#7500CF" 
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: 20,
    position: 'absolute',
    bottom: 10,
    right: 0
  },
  icon: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    paddingLeft: 2,
    paddingRight: 2,
    paddingBottom: 0,
    bottom: 10
  },
});

export default BotaoRemoveAlternativa;

BotaoRemoveAlternativa.propTypes = {
  onPress: PropTypes.func.isRequired
}