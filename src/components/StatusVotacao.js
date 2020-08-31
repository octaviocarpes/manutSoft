import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import {Text,View,StyleSheet} from 'react-native';

const StatusVotacao =({tipo,texto})=> {
  return(
    <View style = {styles.container}>
      {tipo == 'hora' && <Icon name='md-time' size={70} color='#8400C5' />}
      {tipo == 'usuario' && <Icon name='md-contacts' size={70} color='#8400C5' />}  
      <Text style = {styles.text}>
        {texto}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
    text: {
      color: '#00C551',
    },
    container: {
      justifyContent: 'center',
      alignItems: "center" 
    }
  });
export default StatusVotacao;

StatusVotacao.propTypes = {
  tipo: PropTypes.oneOf(['hora','usuario']),
  texto: PropTypes.string
}

StatusVotacao.DefaultProps = {
  tipo: 'hora',
  texto: undefined
}