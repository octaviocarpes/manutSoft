import React, { Component } from 'react';
import {View, Text} from 'react-native';
import BotaoAnterior from '../components/BotaoAnterior';
import BotaoProximo from '../components/BotaoProximo';
import styles from '../styles/estilos';
import InputTexto from '../components/InputTexto';
import Progresso from '../components/Progresso';
import BotaoMaisAlternativas from '../components/BotaoMaisAlternativas';
import BotaoRemoveAlternativa from '../components/BotaoRemoveAlternativa'; 
import Aviso from '../components/Aviso';
import { ScrollView } from 'react-native-gesture-handler';


export default class Questao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sala: {},
      questao: [],
      erroPergunta: "",
      erroAlternativa: ""
    };
  }

  componentWillMount() {
    const questoes = this.state.questao;
    questoes.push({pergunta: "", alternativas: ["", ""]});
    this.setState({questao: questoes});
  }

  static navigationOptions = ({ navigation }) => ({
    title: `Sala: ${navigation.state.params.sala.titulo}`,
    headerLeft: null
  });

  render() {
    const {
      questao,
      erroAlternativa,
      erroPergunta,
    } = this.state;
    return (
      <View style={styles.container}>
        <View styles={[{alignSelf:"auto"}, {marginBottom: 5}]}>
          <Text style={[styles.title2, {color:"#7500CF"}]}>
            Digite a pergunta e as alternativas
          </Text>
          <InputTexto
            error={!!erroPergunta}
            label="Pergunta"
            onChangeText={value => this.handlePergunta(value)}
            value={questao[questao.length-1].pergunta}
          />
        </View>
        <Aviso texto={erroPergunta} />
        <ScrollView style={{alignSelf: 'auto'}}
          ref={ref => this.scrollView = ref}
          onContentSizeChange={(contentWidth, contentHeight)=>{        
              this.scrollView.scrollToEnd({animated: true});
          }}>
          {
            questao[questao.length-1].alternativas.map((alternativa,index) => {
              currentValue = index + 1;
              return (
                <View key={index + 1} style={styles.boxAlternativa}>
                  <InputTexto
                    style={{flex: 7/8}}
                    error={!!erroAlternativa}
                    key={index}
                    max={100}
                    label={"Alternativa " + currentValue }
                    value={questao[questao.length-1].alternativas[index]}
                    onChangeText={text => this.handleAlternativa(text, index)}
                  />
                  {index > 1 &&
                  <BotaoRemoveAlternativa
                    onPress={() => this.removeAlternativa(index)}
                  />
                  }
                </View>
              );
            })
            
          }
          <Aviso texto={erroAlternativa} />
          
        </ScrollView>
        <BotaoMaisAlternativas
          onPress={() => this.addAlternativa()} 
        />
        <View style={styles.flowButtonsContainer}>
          <BotaoAnterior
            endereco='SalaContexto'
            navigation={this.props.navigation}
            style={styles.icon}
          />
          <Progresso quantidade={3} total={5}/>
          <BotaoProximo
            endereco='QuestaoContexto'
            navigation={this.props.navigation}
            style={styles.icon}
            onPress={() => this.validate()}
          />
        </View>

      </View>
    )
  }
  
  validate = () => {
    const { questao } = this.state;
    const { pergunta, alternativas } = questao[questao.length-1];
    const  sala = this.props.navigation.getParam('sala', null);

    if(sala)
      this.setState({sala});

    if(!pergunta) 
      return this.setState({erroPergunta: 'Você não perguntou nada.'});
    if(alternativas.length <= 1 || !alternativas[0] || !alternativas[1] ||
      alternativas[0].length>100 || alternativas[1].length>100)
      return this.setState({erroAlternativa: 'Preencha ao menos 2 alternativas até 100 caracteres.'})
    else {
      const questoes = this.state.questao;
      questoes.push({pergunta: "", alternativas: ["", ""]});
      this.setState({questao: questoes});
      return this.props.navigation.navigate('QuestaoContexto', {
        sala: sala,
        questao: this.state.questao
      })
    }
  }

  handlePergunta = (value) => {
    let { questao } = this.state;
    this.setState({erroPergunta: ""});
    questao[questao.length-1].pergunta = value;
    this.setState({questao: questao});
  }

  addAlternativa = () => {
    let { questao } = this.state;
    let alternativas = questao[questao.length-1].alternativas;
    alternativas.push("");
    questao[questao.length-1].alternativas = alternativas;
    this.setState({questao: questao});
  }

  removeAlternativa = (index) => {
    let { questao } = this.state;
    let alternativas = questao[questao.length-1].alternativas;
    alternativas.pop(questao[index]);
    this.setState({questao: questao});
  }

  handleAlternativa(text, index){
    this.setState({erroAlternativa: ""});
    let { questao } = this.state;
    this.setState({erroPergunta: ""});
    // [ text, 0, []] = texto da alternativa : contador de votos : array de votantes dessa alternativa
    questao[questao.length-1].alternativas[index] = [text, 0, votantes = []];
    this.setState({questao: questao});
  }
  
}