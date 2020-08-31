import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SemSalas = ({ texto }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{texto}</Text>
    <Icon style={styles.icon} 
      name="md-sad" size={50} 
      color="#00C551" 
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#8400C5',
    fontWeight: '500',
    textAlign: 'center'
  },
});

export default SemSalas;

SemSalas.propTypes = {
  texto: PropTypes.string,
}

SemSalas.defaultPropTypes = {
  texto: ""
}