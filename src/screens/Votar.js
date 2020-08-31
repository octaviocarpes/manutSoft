import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, ScrollView, AsyncStorage } from 'react-native';
import BotaoProximo from '../components/BotaoProximo';
import NotificacaoHeader from '../components/NotificacaoHeader';
import BotaoAlternativa from '../components/BotaoAlternativa';
import Aviso from '../components/Aviso';
import styles from '../styles/estilos';
import votarStyles from '../styles/votarStyles';
import BotaoMedio from '../components/BotaoMedio';
import BotaoAnterior from '../components/BotaoAnterior';
import { db } from '../config';

let salasRef = db.ref('salas/');

export default class Votar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      selected: -1,
      alternativas: [],
      sending: false,
      sent: false,
      alternativasVotadas: [],
      erro: ''
    }
  }

  componentDidMount() {
    const { salas, indiceSala } = this.props;
    const { alternativas  } = this.props.questao;
    this.setState({ alternativas, indiceSala, salas });
  }

  getUID = async () => {
    return await AsyncStorage.getItem('@UID');
  }

  handleSubmit = async () => {
    const sent = await this.sendData();
    if (sent) {
      this.setState({ sending: false });
      this.setState({ sent: true });
    }
    this.setState({ sending: false });
  }

  sendData = async () => {
    const { salas } = this.state;
    this.setState({ sending: true });
    await salasRef.remove();
    await salas.forEach( sala => {
      salasRef.push({
        ...sala
      });
    });
    
    return true;
  }

  finalizarVoto = async () => {
    let { questoes } = this.props;
    let { alternativasVotadas, salas, indiceSala } = this.state;

    for(x = 0; x < salas[indiceSala]['questoes'].length; x++){
      for(y = 0; y < questoes[x].alternativas.length; y++){
        if(alternativasVotadas[x][y] >= 0) {
          let posicaoAlternativa = alternativasVotadas[x][y];
          let contadorVotos = questoes[x].alternativas[posicaoAlternativa][1];
          contadorVotos = contadorVotos + 1;
          questoes[x].alternativas[posicaoAlternativa][1] = contadorVotos;
          if(questoes[x].alternativas[posicaoAlternativa][2])
            questoes[x].alternativas[posicaoAlternativa][2].push(await this.getUID());
          else {
            questoes[x].alternativas[posicaoAlternativa][2] = new Array(await this.getUID());
          }
        }
      }
    }

    salas[indiceSala]['questoes'] = questoes;
    this.setState({ salas });
    const sent = await this.sendData();

    if (sent) {
      this.setState({ sending: false });
      this.setState({ sent: true });
    }

    this.setState({ sending: false });
  }

  handleNavigation = ( mudanca ) => {
    const { index, onChange } = this.props;
    const { selected, alternativasVotadas } = this.state;
    if(selected != -1) {
      if (mudanca === 0) {
        if(index > 0)
          this.setState({index: index });
          onChange(this.state.index, alternativasVotadas);
      } else {
          this.setState({ index: index +1 });
          onChange(this.props.index+1, selected, alternativasVotadas);
      }
    } else {
      this.setState({ erro: "Selecione alguma alternativa" });
    }
  }

  handleSelect = (index) => {
    let alternativasVotadas = this.props.alternativasVotadas || this.state.alternativasVotadas;
    if(alternativasVotadas)
      this.setState({ selected: index, erro: '' });
    alternativasVotadas[this.props.index] = [ index ];
    this.setState({alternativasVotadas})
  }

  render() {
    const { selected, sending, sent, erro } = this.state;
    const { index, questao } = this.props;
    return (
    sent ? 
      <View>
        <Text style={{
            alignSelf: 'center',
            color: '#8400C5',
            fontSize: 20,
            fontWeight: 'bold'
          }}>
            Votos cadastrados com sucesso!
        </Text>
        <BotaoMedio texto="Continuar" onPress={() => this.props.navigation.navigate('Inicio')} />
      </View> 
      :
      sending ?
        <View>
          <Text style={{
            alignSelf: 'center',
            color: '#8400C5',
            fontSize: 20,
            fontWeight: 'bold'
          }}>
            Salvando seu voto...
          </Text>
          <ActivityIndicator
            animating={sending}
            size="large"
            color="#00DC7B"
          />
        </View>
      :
      <View style={styles.container}>
        <ScrollView>
          <Text style={votarStyles.pergunta}>
            {questao.pergunta}
          </Text>
          <NotificacaoHeader 
            texto="Selecione uma alternativa (verde = selecionado)"
          />
           <View><Aviso texto={erro} /></View>
            <FlatList
              style={{ marginTop: 20 }}
              data={questao.alternativas}
              numColumns={1}
              renderItem={({ item, index }) => (
                <View>
                  <BotaoAlternativa
                    onPress={() => this.handleSelect(index)}
                    index={index}
                    text={item[0]}
                    selectedIndex={selected}
                  />
                </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
        {this.props.index.valueOf() < this.props.size.valueOf()-1 ?
          <View style={[styles.flowButtonsContainer, { marginTop: 5 }]}>
            <BotaoAnterior
              endereco='Inicio'
              onPress={() => this.handleNavigation(0)}
            />
            <BotaoProximo
              endereco='Inicio'
              onPress={() => this.handleNavigation(1)}
            />
          </View>
          :
          <BotaoMedio
            texto="Finalizar votação"
            onPress={() => this.finalizarVoto()}
          />
        }
      </View>
    )
  }
}