import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

const NotificacaoHeader = ({ texto }) => (
  <View style={styles.container}>
    <Text style={styles.font}>{texto}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  font: {
    color: '#9D9C9D',
    fontSize: 12,
    padding: 0,
    textAlign: 'center'
  }
});

export default NotificacaoHeader;

NotificacaoHeader.propTypes = {
  texto: PropTypes.string.isRequired
};
