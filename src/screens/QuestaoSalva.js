import React, { Component } from 'react';  
import { View, FlatList, StyleSheet, Text } from 'react-native';
import BotaoProximo from '../components/BotaoProximo';
import BotaoAnterior from '../components/BotaoAnterior';
import styles from '../styles/estilos';
import BotaoMedio from '../components/BotaoMedio';

export default class QuestaoSalva extends Component {  

  constructor(props){
    super(props);
    this.state = {
      sala: {},
      documento: undefined,
      informacoes: "",
      questoes: []
    };
  }

  renderItem = ({ item, index }) => {
    if (item.pergunta) return (
    <View style={custom.listItem}>
      <Text style={{color: '#727272'}}>
        <Text style={{color: '#00C551'}}>Questão {index+1}: </Text>
        {item.pergunta}
      </Text>
    </View>
    ); else return null;};

  componentWillMount() {
    const  sala = this.props.navigation.getParam('sala', null);
    const documento = this.props.navigation.getParam('documento', null);
    const informacoes = this.props.navigation.getParam('informacoes', null);
    const  questoes = this.props.navigation.getParam('questoes', null);

    if(sala)
      this.setState({sala});
    if(documento)
      this.setState({documento});
    if(informacoes)
      this.setState({informacoes});
    if(questoes)
      this.setState({questoes});
  }

  static navigationOptions = {
    headerLeft: null
  };

  handleSubmit = () => {
    const { sala, documento, informacoes } = this.state;
    const { questoes } = this.state;

    this.props.navigation.navigate('Convidados', {
      sala: sala,
      documento: documento,
      informacoes: informacoes,
      questoes: questoes
    })
  }

  render() {
    const { questoes } = this.state;
    const qtd = questoes.length-1;
    return (
      <View style={styles.container}>
        <View style={{flex: 2}}>
          <Text style={custom.titulo}>Questão {qtd} adicionada!</Text>
          <BotaoMedio
            backgroundColor='#00E576'
            onPress={() => this.props.navigation.navigate('Questao')}
            texto='Adicionar mais questões'
          />

          <Text style={[custom.titulo, {fontSize: 16}]}>Questões já adicionadas ({qtd}):</Text>
        </View>

        <View style={{flex: 7}}>
          <FlatList
            contentContainerStyle={custom.list}
            data={questoes}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
          />
        </View>

        <View style={styles.flowButtonsContainer}>
          <BotaoAnterior 
            endereco='QuestaoContexto' 
            navigation={this.props.navigation}
          />
          <BotaoProximo
            endereco='Convidados' 
            navigation={this.props.navigation} 
            onPress={() => this.handleSubmit()}
          />
        </View>
      </View>
    );
  }
}

const custom = StyleSheet.create({
  titulo: {
    alignSelf: 'center',
    color: '#8400C5',
    fontSize: 20,
    fontWeight: 'bold'
  },
  list: {
    paddingHorizontal: 20
  },
  listItem: {
    marginTop: 20,
    paddingVertical: 5
  },
});