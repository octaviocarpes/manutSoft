import React, { Component } from 'react'; 
import { Text, View } from 'react-native';
import BotaoGrande from '../components/BotaoGrande';
import styles from '../styles/estilos';
import andamento from '../styles/andamento';
import StatusVotacao from '../components/StatusVotacao';
import getStatus from '../utils/getStatus';

export default class Andamento extends Component {
  constructor(props) {
      super(props);
      this.state = {
        titulo: '',
        sala: [],
        encerrou: false
      }
  }
  static navigationOptions = ({ navigation }) => ({
    title: `Sala: ${navigation.state.params.sala.titulo}`,
  });

  componentWillMount() {
    const  sala = this.props.navigation.getParam('sala', null);
    const  encerrou = this.props.navigation.getParam('encerrou', null);
    
    if(sala)
      this.setState({sala});
    if(encerrou)
      this.setState({encerrou});
  }

  andamentoVotos = () => {
    this.props.navigation.navigate('AndamentoVotos', {
      'titulo': this.state.sala.titulo,
      'questoes': this.state.sala.questoes,
      'votantes': this.state.sala.votantes
    })
  }

  getVotosRealizados = () => {
    const { votantes, questoes } = this.state.sala;
    if(votantes && questoes) {
      const qtdVotantes = votantes.length;
      let count = 0;
      let { alternativas } = questoes[0];
      alternativas.forEach(element => {
        if(element && element[1]) {
          //contabiliza a qtd de votos nas alternativas da questão[0], já que é obrigatório votar em somente uma.
          count = count + element[1];
        }
      });
      const porcentagem = 100*count/qtdVotantes;
      return Number(porcentagem).toFixed(2);
    }
  }

  render() {
    const { sala, encerrou } = this.state;
    return (
      <View style={styles.container}>
        <Text style={andamento.descricao}>
            {sala.descricao}
        </Text>
        <View>
          <StatusVotacao tipo = 'usuario' texto={`${this.getVotosRealizados() || 0}% dos usuários votaram`} />
          <StatusVotacao tipo = 'hora' texto = {
            encerrou ? 'Votação encerrou em: ' + 
            getStatus(
              sala.dataFinal,
              sala.dataInicial,
              sala.horaFinal,
              sala.horaInicial,
              true
            ): "Votação ainda não encerrou."
          }/>
        </View>
        <BotaoGrande texto="Andamento" onPress={() => this.andamentoVotos()}/>
      </View>
    );
  }
}