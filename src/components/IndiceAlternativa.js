import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

const IndiceAlternativa = ({ destaque, indice }) => {
  return(
    destaque ? 
    <View style={styles.container}>
      <Text style={styles.text}>{indice}</Text>
    </View>
    :
    <View style={{ width: 25, borderRadius: 40 }}>
      <Text style={{ alignSelf: 'center' }}>{indice}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7500CF',
    borderRadius: 40,
    width: 25
  },
  text: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: '500'
  }
});

export default IndiceAlternativa;

IndiceAlternativa.propTypes = {
  destaque: PropTypes.bool,
  indice: PropTypes.string.isRequired
}

IndiceAlternativa.defaultPropTypes = {
  destaque: false
}