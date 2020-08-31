import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Aviso = ({ texto }) => {
  return(
    texto ?
    <View style={styles.container}>
      <Icon style={styles.icon} 
        name="md-warning" size={20} 
        color="red" 
      />
      <Text style={styles.text}>{texto}</Text>
    </View>
    : false
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  icon: {
    // marginLeft: 10,
  },
  text: {
    textAlign: 'center',
    color: 'red',
    paddingLeft: 5,
    paddingRight: 5
  }
});

export default Aviso;

Aviso.propTypes = {
  texto: PropTypes.string
}

Aviso.defaultPropTypes = {
  texto: ""
}