import React, { Component } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import Aviso from '../components/Aviso';
import BotaoAnterior from '../components/BotaoAnterior';
import BotaoProximo from '../components/BotaoProximo';
import TimeInput from '../components/TimeInput';
import InputTexto from '../components/InputTexto';
import styles from '../styles/estilos';
import DateInput from '../components/DateInput';
import Progresso from '../components/Progresso';
export default class Sala extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sala: {
        descricao: "",
        dataInicial: undefined,
        dataFinal: undefined,
        horaInicial: undefined,
        horaFinal: undefined,
        titulo: "",
      },
      erroTitulo: "",
      erroDescricao: "",
      erroDataInicial: "",
      erroDataFinal: "",
      erroHoraInicial: "",
      erroHoraFinal: "",
      sending: false,
      sent: false,
      maxTitle: 100,
      maxDesc: 500,
      validated: false
    };
  }
  static navigationOptions = {
    title: 'Criar Sala',
    headerLeft: null
  };

  componentWillMount(){
    AsyncStorage.getItem('@UID').then(uid => {
      this.setState({sala: {...this.state.sala, adm_uid: uid}});
    },
    error => console.log('Verifique as credencias.', error));
  }

  horaInvalida = (hF,hI) => {
    const { dataFinal, dataInicial } = this.state.sala;
    if (dataFinal == dataInicial) {
      const horaFinal = hF.split(":");
      const horaInicial = hI.split(":");

      const horasF = parseInt(horaFinal[0], 10);
      const minutosF = parseInt(horaFinal[1], 10);

      const horasI = parseInt(horaInicial[0], 10);
      const minutosI = parseInt(horaInicial[1], 10);

      if (horasF < horasI)
        return true;
      else if (horasF == horasI) {
        if (minutosF - minutosI < 30) {
          return true;
        } else if (minutosF - minutosI >= 30) {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  validate = async () => {
    const {
      sala,
      maxTitle,
      maxDesc
    } = this.state;

    let error = '';

    if (!sala.titulo || sala.titulo.length > maxTitle)
      error = 'titulo';
    else if (!sala.dataInicial)
      error = 'dataInicial';
    else if (!sala.dataFinal)
      error = 'dataFinal';
    else if (!sala.horaInicial)
      error = 'horaInicial';
    else if (!sala.horaFinal || this.horaInvalida(sala.horaFinal, sala.horaInicial))
      error = 'horaFinal';
    else if (!sala.descricao || sala.descricao.length > maxDesc)
      error = 'descricao';

    switch (error) {
      case 'titulo':
        return this.setState({ erroTitulo: `Informe um título de até ${maxTitle} caracteres` })
      case 'descricao':
        return this.setState({ erroDescricao: `Informe uma descrição de até ${maxDesc} caracteres` })
      case 'dataInicial':
        return this.setState({ erroDataInicial: 'Informe uma data inicial válida' })
      case 'dataFinal':
        return this.setState({ erroDataFinal: 'Informe uma data final' })
      case 'horaInicial':
        return this.setState({ erroHoraInicial: 'Informe uma hora inicial' })
      case 'horaFinal':
        return this.setState({ erroHoraFinal: 'Informe uma hora final com no mínimo 30 minutos a partir do início' })
      default:
        return this.setState({ validated: true });
    }
  }

  handleTimeChange = (time, id) => {
    this.setState({ erroHoraInicial: "", erroHoraFinal: "" });
    if (id == 'hInicial') {
      this.setState({ erroHoraInicial: "" });
      this.setState({ sala: { ...this.state.sala, horaInicial: time } });
    }
    else if (id == 'hFinal') {
      this.setState({ erroHoraFinal: "" });
      this.setState({ sala: { ...this.state.sala, horaFinal: time } });
    }
  }

  handleTitle = (value) => {
    this.setState({ erroTitulo: "" });
    this.setState({ sala: { ...this.state.sala, titulo: value } });
  }

  handleDescription = (value) => {
    this.setState({ erroDescricao: "" });
    this.setState({ sala: { ...this.state.sala, descricao: value } });
  }

  handleSubmit = async () => {
    await this.validate();
    if (this.state.validated) {
      this.props.navigation.navigate('SalaContexto', { sala: this.state.sala });
    }
    else if (
      !this.state.erroTitulo
      && !this.state.erroDescricao
      && !this.state.erroDataInicial
      && !this.state.erroDataFinal
      && !this.state.erroHoraInicial
      && !this.state.erroHoraFinal
    )
      alert("Verifique os dados!");
  }

  handleDate = (value, id) => {
    this.setState({
      erroDataFinal: "",
      erroDataInicial: "",
      erroHoraFinal: "",
      erroHoraInicial: ""
    });

    if (id == "dataInicial") {
      this.setState({ sala: { ...this.state.sala, dataInicial: value } });
    }
    else if (id == "dataFinal") {
      this.setState({ sala: { ...this.state.sala, dataFinal: value } });
    }
  }

  render() {
    const {
      sala,
      descricaoLimite,
      erroTitulo,
      erroDescricao,
      erroDataInicial,
      erroDataFinal,
      erroHoraInicial,
      erroHoraFinal
    } = this.state;
    return (
      // <KeyboardAvoidingView style={styles.containerKeyboard}
        // behavior="padding" enabled keyboardVerticalOffset={120}>
        <ScrollView>
          <View style={styles.container}>
            <View>
              <View style={styles.innerContainer}>
                <InputTexto
                  error={!!erroTitulo}
                  label="Título"
                  max={this.state.maxTitle}
                  multiline
                  onChangeText={value => this.handleTitle(value)}
                  value={sala.titulo}
                />
                <Aviso texto={erroTitulo} />
                <View style={styles.PrincipalView}>
                  <View style={styles.PrimeiraView}>
                    <DateInput
                      titulo={"Data Inicial"}
                      maxDate={sala.dataFinal}
                      onDateChange={value => this.handleDate(value, "dataInicial")}
                    />

                    <DateInput
                      titulo={"Data Final"}
                      minDate={sala.dataInicial}
                      onDateChange={value => this.handleDate(value, "dataFinal")}
                    />
                  </View>

                  <View style={styles.SegundaView}>
                    <TimeInput
                      onTimeChange={date => this.handleTimeChange(date, "hInicial")}
                      titulo="Hora Inicial"
                    />
                    <TimeInput
                      onTimeChange={date => this.handleTimeChange(date, "hFinal")}
                      titulo="Hora Final"
                    />
                  </View>
                </View>
                <Aviso texto={erroDataInicial} />
                <Aviso texto={erroDataFinal} />
                <Aviso texto={erroHoraInicial} />
                <Aviso texto={erroHoraFinal} />
                <InputTexto
                  error={!!erroDescricao}
                  label="Descrição"
                  max={this.state.maxDesc}
                  multiline
                  onChangeText={value => this.handleDescription(value)}
                  value={sala.descricao}
                />
                {descricaoLimite && <Text>Limite de caracteres atingido na descrição!</Text>}
                <Aviso texto={erroDescricao} />
              </View>
            </View>
            <View style={styles.flowButtonsContainer}>
              <BotaoAnterior
                endereco='Inicio'
                navigation={this.props.navigation}
              />
              <Progresso quantidade={1} total={5} />
              <BotaoProximo
                endereco='SalaContexto'
                onPress={() => this.handleSubmit()}
              />
            </View>
          </View>
        </ScrollView>

      //</KeyboardAvoidingView> 

    )
  }
}
