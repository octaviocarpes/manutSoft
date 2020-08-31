import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

const QuestaoCard = ({ text }) => (
 <View style={styles.container}>
   <Text style={styles.text}>{text}</Text>
 </View>
);

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: '#7500CF',
    width: '100%',
    marginBottom: 10,
    minHeight: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  text: {
    color: 'white',
    textAlign: 'center'
  }
});

export default QuestaoCard;

QuestaoCard.propTypes = {
  text: PropTypes.string.isRequired
}