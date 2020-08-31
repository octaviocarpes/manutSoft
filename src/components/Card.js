import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

const Card = ({ leftInfo, rightInfo }) => (
  <View
    style={styles.container}
  >
    <View style={styles.left}>
      <Text style={styles.leftInfo}>{leftInfo}</Text>
    </View>
    <View style={styles.right}>
      <Text style={styles.rightInfo}>{rightInfo}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 86,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'transparent',
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 5,
  },
  left: {
    flex: 1,
    left: 0,
    justifyContent: 'center'
  },
  right: {
    flex: 1,
    right: 0,
    justifyContent: 'center'
  },
  leftInfo: {
    color: '#7500CF',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  },
  rightInfo: {
    color: '#00C551',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold'
  }
});

Card.propTypes = {
  leftInfo: PropTypes.string.isRequired,
  rightInfo: PropTypes.string
}

export default Card;
