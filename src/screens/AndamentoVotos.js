import React, { Component } from 'react'; 
import { Text, View, FlatList, ScrollView, AsyncStorage, TouchableOpacity } from 'react-native';
import QuestaoCard from '../components/QuestaoCard';
import styles from '../styles/estilos';
import andamento from '../styles/andamento';
import BarraProgresso from '../components/BarraProgresso';
import IndiceAlternativa from '../components/IndiceAlternativa';

export default class Andamento extends Component {
  constructor(props) {
      super(props);
      this.state = {
        qtdVotantes: 0,
        questoes: []
      }
  }
  static navigationOptions = ({ navigation }) => ({
    title: `Sala: ${navigation.state.params.titulo || 'Não localizado'}`
  });

  async componentWillMount() {
    const  questoes = this.props.navigation.getParam('questoes', null);
    const  votantes = this.props.navigation.getParam('votantes', null);
    
    if(questoes)
      this.setState({questoes});
    if(votantes)
      this.setState({votantes, qtdVotantes: votantes.length});

    const uid = await this.getUID();
    this.setState({ uid });
  }

  getUID = async () => {
    try{
      const id = await AsyncStorage.getItem('@UID');
      return id;
    }catch (error) {
      console.warn("AsyncStorage Error: " + error.message);
    }
  }

  getQtdVotos = (index) => {
    const { questoes } = this.state;
    let cont = 0;
    questoes[index].alternativas.map(alternativa => {
      cont = cont + alternativa[1];
    });
    return cont;
  }

  confereVoto (alternativa) {
    const { uid } = this.state;
    let result = 0;
    if(alternativa[2]) {
      const votantes = alternativa[2];
      if(votantes.length > 1){
        result = votantes.filter(id => id === uid).length;
      }
      else if(votantes.length == 1){
        if(votantes == uid) {
          result = 1;
        }
      }
    }
    if(result > 0)
      return true;
    else
      return false;
  }

  renderItem = ({ item, index }) => {
    const { qtdVotantes, mostrarTitulo, indexMostrar, questaoMostrar } = this.state;
    const alfabeto = ['a', 'b',	'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n'];
    const totalDeVotos = this.getQtdVotos(index);
    return (
      <View>
        <QuestaoCard key={item.pergunta} text={`Q${index+1}. ${item.pergunta}`}/>
        {
          item.alternativas.map((alternativa, indice) => {
            const voto = this.confereVoto(alternativa) || false;
            return (
              <View>
                <TouchableOpacity 
                  key={indice + 1 + index} 
                  style={andamento.alternativas} 
                  onPress={() => this.setState({ mostrarTitulo: alternativa[0], indexMostrar: indice, questaoMostrar: index})}
                >
                  <IndiceAlternativa destaque={voto} indice={`${alfabeto[indice]})`} />
                  <BarraProgresso progresso={Number(((alternativa[1]/totalDeVotos)*100).toFixed(1)) || 0} />
                  <Text>{Number(((alternativa[1]/totalDeVotos)*100).toFixed(5)) || 0}%</Text>
                </TouchableOpacity>
                {(indexMostrar == indice && questaoMostrar == index) ?
                <View key={indice + 2 + index}>
                  <Text><Text style={{ color: "#8400C5" }}>Alternativa:</Text> {mostrarTitulo}</Text>
                </View>:
                null}
              </View>
              );
          })
        }
      </View>
    )
  };

  render() {
    const { questoes } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
          <FlatList
            style={{ marginTop: 20 }}
            data={questoes}
            numColumns={1}
            renderItem={this.renderItem}
            keyExtractor={(index) => index.toString()}
          />
        </ScrollView>
      </View>
    );
  }
}