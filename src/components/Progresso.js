import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

const Progresso = ({ quantidade, total }) => {
  const passos = () => {
    let render = new Array(total);
    for(i=0; i<total;i++) {
      render[i] = <View key={i} style={i<quantidade ? styles.done : styles.not}></View>
    }
    return render;
  }
  return(
    <View style={styles.container}>
      {passos()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  done: {
    marginLeft: 2,
    marginRight: 2,
    width: 10,
    height: 10,
    backgroundColor: "#7500CF",
    borderRadius: 10
  },
  not: {
    marginLeft: 2,
    marginRight: 2,
    width: 10,
    height: 10,
    backgroundColor: "#C4C4C4",
    borderRadius: 10
  }
});

export default Progresso;

Progresso.propTypes = {
  quantidade: PropTypes.number,
  total: PropTypes.number
}

Progresso.defaultPropTypes = {
  quantidade: 1,
  total: 1
}