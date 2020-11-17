import React, { Component } from 'react';
import { ActivityIndicator, View, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import styles from '../styles/estilos';
import Icon from 'react-native-vector-icons/Ionicons';
import InputTexto from '../components/InputTexto';
import BotaoProximo from '../components/BotaoProximo';
import BotaoMedio from '../components/BotaoMedio';
import Progresso from '../components/Progresso';
import BotaoAnterior from '../components/BotaoAnterior';
import BotaoCheck from '../components/BotaoCheck';
import { db } from '../config';
let usuariosRef = db.ref('usuarios/');

export default class Convidados extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sala: {},
      documento: null,
      informacoes: "",
      questoes: [],
      pesquisa: undefined,
      value: '',
      sending: false,
      sent: false
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: `Sala: ${navigation.state.params.sala.titulo}`,
    headerLeft: null
  });

  componentWillMount() {
    const sala = this.props.navigation.getParam('sala', null);
    let questoes = this.props.navigation.getParam('questoes', null);
    questoes.pop(questoes[questoes.length - 1]);
    if (sala)
      this.setState({ sala });
    if (questoes)
      this.setState({ questoes });
    usuariosRef.orderByChild("uid").on('value', snapshot => {
      let convidados = snapshot.val();

      if (convidados != null) {
        convidados = Object.values(convidados);
        this.setState(() => ({
          convidados
        }))
      }
    });
  }

  handleSearch = (value) => {
    this.setState({ value });
    let items;
    if (value) {
      const encontrados = this.state.convidados.filter(item => {
        if (item.cpf && item.email) {
          items =
            `${item.nome.toUpperCase()}
            ${item.email.toUpperCase()}
            ${item.incluido}`;
        } else if (item.cpf) {
          items =
            `${item.nome.toUpperCase()}
            ${item.incluido}`;
        } else if (item.email) {
          items =
            `${item.nome.toUpperCase()}
            ${item.email.toUpperCase()}
            ${item.incluido}`;
        }

        const text = value.toUpperCase();

        return items.indexOf(text) > -1;
      });
      if (encontrados.length != 0) {
        this.setState({ pesquisa: encontrados });
      }
      else {
        this.setState({ pesquisa: false });
      }
    } else {
      this.setState({ pesquisa: false });
    }
  }

  sendData = async () => {
    this.setState({ sending: true });
    let {
      sala,
      questoes,
    } = this.state;
    let salaCompleta = sala;
    let questoesSalas = questoes;
    if (questoesSalas) {
      salaCompleta = Object.assign(sala, { 'questoes': questoesSalas });
    }
    if (salaCompleta)
      this.setState({ sala: salaCompleta });

    const response_sala = await
      db.ref('salas/').push({
        ...sala
      }).then(() => {
        return true;
      }).catch((error) => {
        console.warn('error ', error);
        return false;
      });

      const response_questoes = await
      db.ref('questoes/').push({
        ...questoes
      }).then(() => {
        return true;
      }).catch((error) => {
        console.warn('error ', error);
        return false;
      });

      const response_alternativas = 
      questoes.map((questao) => {
        db.ref('alternativas/').push({
          ...questao.alternativas
        }).then(() => {
          return true;
        }).catch((error) => {
          console.warn('error ', error);
          return false;
        });
      });
          
    if(response_sala && response_questoes && response_alternativas)
      return response_sala;
    else {
      return false;
    }
  }

  handleSubmit = async () => {
    let { convidados, sala } = this.state;
    let votantes = [];
    convidados.map(item => {
      if (item.incluido) {
        votantes.push(item);
      }
    });
    if (votantes)
      sala = Object.assign(sala, { 'votantes': votantes });
    if (sala) {
      this.setState({ sala });
    }
    const sent = await this.sendData();
    if (sent) {
      this.setState({ sending: false });
      this.setState({ sent: true });
    }
    this.setState({ sending: false });
  }

  handleOnPress = (index) => {
    const { pesquisa, convidados } = this.state;
    convidadosAtualizados = convidados;

    if (pesquisa) {
      convidadosAtualizados.map(item => {
        if (item.cpf == pesquisa[index].cpf
          || item.email == pesquisa[index].email) {
          item.incluido
            ? item.incluido = false
            : item.incluido = true;
        }
      });
    } else {
      convidadosAtualizados[index].incluido
        ? convidadosAtualizados[index].incluido = false
        : convidadosAtualizados[index].incluido = true;
    }

    this.setState({
      convidados: convidadosAtualizados
    });
  }

  pesquisaVazia = () => {
    if (this.state.value) {
      return (
        <Text style={{
          flex: 1,
          textAlign: 'center',
          color: 'gray',
          fontSize: 18,
          paddingTop: 15
        }}>Não foram encontrados resultados.</Text>
      )
    }
  }

  render() {
    const { convidados, pesquisa, value, sending, sent } = this.state;
    return (
      sent ? 
      <View>
        <Text style={{
            alignSelf: 'center',
            color: '#8400C5',
            fontSize: 20,
            fontWeight: 'bold'
          }}>
            Sala cadastrada com sucesso!
        </Text>
        <BotaoMedio texto="Continuar" onPress={() => this.props.navigation.navigate('Inicio')} />
      </View> :
      sending ?
        <View>
          <Text style={{
            alignSelf: 'center',
            color: '#8400C5',
            fontSize: 20,
            fontWeight: 'bold'
          }}>
            Salvando a sala...
        </Text>
          <ActivityIndicator
            animating={sending}
            size="large"
            color="#00DC7B"
          />
        </View> :
        <View style={styles.container}>

          <View style={[{ alignSelf: "auto" }, { marginBottom: 5 }]}>
            <Text style={styles.title2}>Adicionar votantes</Text>
          </View>

          <View style={{ alignSelf: "auto" }}>
            <InputTexto
              label="Pesquisar por CPF, Nome ou Email"
              onChangeText={value => this.handleSearch(value)}
              value={value}
            />
            <Icon
              style={{ alignSelf: 'flex-end', marginTop: -33 }}
              name="md-search"
              size={20}
              color='#9d9c9d'
            />
          </View>

          {this.state.value && pesquisa ? (
            <ScrollView style={[{ alignSelf: 'auto' }, { marginTop: 10 }]}>
              <FlatList
                style={{ marginTop: 20 }}
                data={pesquisa}
                numColumns={1}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => this.handleOnPress(index)}
                    style={{ marginLeft: 30, marginBottom: 20 }}
                  >
                    <Text>{item.nome} </Text>
                    <Text style={{ color: '#9b9b9b', fontSize: 14 }}>CPF: {item.cpf} </Text>
                    <BotaoCheck pressed={item.incluido} />
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </ScrollView>
          ) : this.pesquisaVazia()}
          {!this.state.value ? (
            <ScrollView style={[{ alignSelf: 'auto' }, { marginTop: 10 }]}>
              <FlatList
                style={{ marginTop: 20 }}
                data={convidados}
                numColumns={1}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => this.handleOnPress(index)}
                    style={{ marginLeft: 30, marginBottom: 20 }}
                  >
                    <Text>{item.nome} </Text>
                    <Text style={{ color: '#9b9b9b', fontSize: 14 }}>CPF: {item.cpf} </Text>
                    <BotaoCheck pressed={item.incluido} />
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </ScrollView>
          ) : null}

              
          <View style={[styles.flowButtonsContainer, { alignSelf: "auto" }, { marginTop: 5 }]}>
            <BotaoAnterior
              endereco='QuestaoSalva'
              navigation={this.props.navigation}
            />
            <Progresso quantidade={5} total={5}/>
            <BotaoProximo
              endereco='Inicio'
              navigation={this.props.navigation}
              onPress={() => this.handleSubmit()}
            />
          </View>

        </View>
    );
  }
}