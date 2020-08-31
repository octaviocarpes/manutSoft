import React, { Component } from 'react'; 
import { ScrollView, StyleSheet, View } from 'react-native';
import BotaoGrande from '../components/BotaoGrande';
import Descricao from '../components/Descricao';
import BotaoDownload from '../components/BotaoDownload';
import NotificacaoHeader from '../components/NotificacaoHeader';
import styles from '../styles/estilos';
import CardInfo from '../components/CardInfo';
import { FileSystem } from 'expo';
import { storageRef } from '../config';

export default class Votacao extends Component {
  constructor(props) {
      super(props);
      this.state = {
        sala: []
      }
  }

  componentWillMount() {
    if(this.props.navigation) {
      const { sala, salas, indiceSala } = this.props.navigation.state.params;
      this.setState({ sala, salas, indiceSala });
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: `Sala: ${navigation.state.params.sala.titulo}`,
  });

  handleDownload = async () => {
    // não implementado
  }
  
  visualizarQuestao = () => {
    const { sala, indiceSala, salas } = this.state;
    const { questoes } = this.state.sala;
    if (sala && questoes)
      this.props.navigation.navigate('VisualizarQuestao', { 'questoes': questoes, 'titulo': sala.titulo, 'sala': sala, 'indiceSala': indiceSala, 'salas': salas });
    else
      this.props.navigation.navigate('VisualizarQuestao', { 'questoes': 'Não disponível' });
  }

  render() {
    const { sala } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <ScrollView horizontal>
            <View style={[stylesVotacao.cards]}>
              <CardInfo 
                titulo="Início da Votação"
                data={sala.dataInicial}
                hora={sala.horaInicial}
              />
              <CardInfo
                titulo="Fim da Votação"
                data={sala.dataFinal}
                hora={sala.horaFinal}
              />
            </View>
          </ScrollView>
          <View style={{ flex:4/8, justifyContent: 'space-between' }} >
            <View style={{ paddingBottom: 50, paddingTop: 50 }}>
              <Descricao
                titulo="Descrição desta votação:"
                texto={sala.descricao}
              />
            </View>
            {sala.informacao_adicional ?
            <View style={{ paddingBottom: 50 }}>
              <Descricao
                titulo="Informações adicionais:"
                texto={sala.informacao_adicional}
              />
            </View>
            : null
            }
            <NotificacaoHeader 
              texto="Arquivo sobre esta sala de votação:"
            />
            <BotaoDownload texto="..." onPress={() => this.handleDownload()}/>
          </View>
      </ScrollView>

      <View style={[styles.flowButtonsContainer, {alignSelf: "center"}, {marginTop: 5}]}>
        <BotaoGrande
          backgroundColor="#00E576"
          texto="Começar"
          onPress={() => this.visualizarQuestao()}
        />
      </View>
    </View>
    );
  }
}

const stylesVotacao = StyleSheet.create({
  cards: {
    flex:4/8,
    alignItems: "center",
    width: 400,
    height: 180,
    flexDirection: "row",
    justifyContent:"space-around"
  }
});