import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Dimensions
} from 'react-native';
 
import ProgressBarAnimated from 'react-native-progress-bar-animated';
 
const BarraProgresso = ({ progresso, ...props }) => {
  const largura = Dimensions.get('screen').width - 140;
  const progressCustomStyles = {
    backgroundColor: '#00C551', 
    borderRadius: 1,
    borderWidth: 1,
    borderColor: '#00C551'
  };

  return (
    <View style={styles.container}>
      <ProgressBarAnimated
        {...progressCustomStyles}
        width={largura}
        maxValue={100}
        value={progresso}
      />
    </View>
  );
};

export default BarraProgresso;
 
const styles = StyleSheet.create({
  container: {
    padding: 5
  }
});

BarraProgresso.propTypes = {
  progresso: PropTypes.number.isRequired
}