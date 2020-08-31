import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const BotaoProximo = ({ endereco, onPress, navigation, disabled }) => (
  onPress ? //se precisar de validação de campo, você usar o callback passando o onPress e fazer a navegação pela própria screen
    (<TouchableOpacity
      disabled={disabled}
      onPress={onPress}
     >
      <Icon style={styles.icon} 
        name="md-arrow-forward" size={50} 
        color={ disabled ? 'gray' : "#8400C5"}
      />
    </TouchableOpacity>)
  :
    (<TouchableOpacity
      disabled={disabled}
      onPress={() => navigation.navigate(endereco)}
     >
      <Icon style={styles.icon} 
        name="md-arrow-forward" size={50} 
        color={ disabled ? 'gray' : "#8400C5"}
      />
    </TouchableOpacity>)
);

const styles = StyleSheet.create({
  icon: {
    flexDirection: 'column',
    alignSelf: 'flex-end',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10
  },
});

export default BotaoProximo;

BotaoProximo.propTypes = {
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  endereco: PropTypes.string,
  navigation: PropTypes.object
}

BotaoProximo.defaultPropTypes = {
  disabled: false,
  onPress: () => {},
  endereco: undefined,
  navigation: undefined
}