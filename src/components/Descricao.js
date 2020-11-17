import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

const Descricao = ({ titulo, texto }) => {
  return(
    texto || titulo ?
    <View style={styles.container}>
      {titulo && <Text style={styles.titulo}>{titulo}</Text>}
      <View style={{ flex: 1/2 }}>
        {texto && <Text style={styles.texto}>{texto}</Text>}
      </View>
    </View>
    : false
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexDirection: 'column'
  },
  titulo: {
    flex: 1,
    color: '#7500CF',
    fontSize: 18
  },
  texto: {
    flex: 1,
    textAlign: 'left',
    color: 'black',
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 16
  }
});

export default Descricao;

Descricao.propTypes = {
  texto: PropTypes.string,
}

Descricao.defaultPropTypes = {
  texto: "",
}