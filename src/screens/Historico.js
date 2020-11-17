import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Text } from 'react-native';
import styles from '../styles/estilos';
import SemSalas from '../containers/SemSalas';
import CardSalaVotacao from '../components/CardSalaVotacao';
import Barra from '../components/Barra';
import getStatus from '../utils/getStatus';

class Historico extends Component {  
  constructor(props) {
    super(props)
    this.state = {
      salas: []
    }
  }
  static navigationOptions = {
    title: 'Histórico de Votações',
  };

  componentWillMount(){
    const salas = this.props.navigation.getParam('salas', []);
    this.setState({salas});
  }

  handleVisualizar = (item) => {
    if (item)
      this.props.navigation.navigate('Andamento', { 'sala': item, 'encerrou': true });
    else
      this.props.navigation.navigate('Andamento', { 'sala': 'Não disponível' });
  }

  render() {
    const { salas } = this.state;
    const { height } = Dimensions.get('screen');
    return (
      <View style={[styles.container, { height: height }]}>
        <ScrollView style={{ maxHeight: height - 160, marginBottom: 5 }}>
          <View>
            {
              salas.length > 0 ?
                salas.map((item, index) =>
                (getStatus(item.dataFinal,
                  item.dataInicial, item.horaFinal,
                  item.horaInicial, false)) == 'encerrada'?
                  <CardSalaVotacao
                    key={index}
                    onPress={() => this.handleVisualizar(item)}
                    status={getStatus(item.dataFinal,
                      item.dataInicial, item.horaFinal,
                      item.horaInicial)}
                      mensagem={getStatus(item.dataFinal,
                      item.dataInicial, item.horaFinal,
                      item.horaInicial, true)}
                    titulo={item.titulo}
                  />:
                  null
                )
                :
                <SemSalas
                  texto="Você não participou de votações prévias."
                />
            }
          </View>

        </ScrollView>
        <Barra
          index={true}
          onPress={() => this.props.navigation.navigate('Inicio')}
        />
      </View>
    );
  }
}
export default Historico;
