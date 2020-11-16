import React, { Component } from 'react';
import { Text, View } from 'react-native';
import BotaoGrande from '../components/BotaoGrande';
import styles from '../styles/estilos';
import andamento from '../styles/andamento';
import StatusVotacao from '../components/StatusVotacao';
import getStatus from '../utils/getStatus';

import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

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
    const sala = this.props.navigation.getParam('sala', null);
    const encerrou = this.props.navigation.getParam('encerrou', null);

    if (sala)
      this.setState({ sala });
    if (encerrou)
      this.setState({ encerrou });
  }

  andamentoVotos = () => {
    this.props.navigation.navigate('AndamentoVotos', {
      'titulo': this.state.sala.titulo,
      'questoes': this.state.sala.questoes,
      'votantes': this.state.sala.votantes
    })
  }

  compartilharAndamento = async (sala, andamento, encerrou) => {
    const html = `
        <div style="display:flex;align-itens:center;justify-content:center;text-align:center;font-size:14px">
          <div style="color:#00C551">Sala: ${this.state.sala.titulo}<div/>
          <div style="color:#8400C5"><b>${sala.descricao} <b><div/>
          <br/><br/><br/><br/>
          <?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" fill=#8400C5 width="64px" height="64px" viewBox="0 0 512 512" xml:space="preserve"><path d="M239.208 343.937c-17.78 10.103-38.342 15.876-60.255 15.876-21.909 0-42.467-5.771-60.246-15.87C71.544 358.331 42.643 406 32 448h293.912c-10.639-42-39.537-89.683-86.704-104.063z"/><path d="M178.953 120.035c-58.479 0-105.886 47.394-105.886 105.858 0 58.464 47.407 105.857 105.886 105.857s105.886-47.394 105.886-105.857c0-58.464-47.408-105.858-105.886-105.858zm0 186.488c-33.671 0-62.445-22.513-73.997-50.523H252.95c-11.554 28.011-40.326 50.523-73.997 50.523z"/><g><path d="M322.602 384H480c-10.638-42-39.537-81.691-86.703-96.072-17.781 10.104-38.343 15.873-60.256 15.873-14.823 0-29.024-2.654-42.168-7.49-7.445 12.47-16.927 25.592-27.974 34.906C289.245 341.354 309.146 364 322.602 384z"/><path d="M306.545 200h100.493c-11.554 28-40.327 50.293-73.997 50.293-8.875 0-17.404-1.692-25.375-4.51a128.411 128.411 0 0 1-6.52 25.118c10.066 3.174 20.779 4.862 31.895 4.862 58.479 0 105.886-47.41 105.886-105.872 0-58.465-47.407-105.866-105.886-105.866-37.49 0-70.427 19.703-89.243 49.09C275.607 131.383 298.961 163 306.545 200z"/></g><metadata><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#" xmlns:dc="http://purl.org/dc/elements/1.1/"><rdf:Description about="https://iconscout.com/legal#licenses" dc:title="android,contacts" dc:description="android,contacts" dc:publisher="Iconscout" dc:date="2017-09-24" dc:format="image/svg+xml" dc:language="en"><dc:creator><rdf:Bag><rdf:li>Benjamin J Sperry</rdf:li></rdf:Bag></dc:creator></rdf:Description></rdf:RDF></metadata></svg>     
          <div style="color:#00C551">${this.getVotosRealizados()} dos usuários votaram<div/>
          <br/><br/>
          <svg xmlns="http://www.w3.org/2000/svg" fill=#8400C5 width="64" height="64" enable-background="new 0 0 32 32" viewBox="0 0 32 32"><path d="M16,2.998C8.831,2.998,2.998,8.831,2.998,16c0,7.169,5.833,13.002,13.002,13.002c7.169,0,13.002-5.833,13.002-13.002
          C29.002,8.831,23.169,2.998,16,2.998z M16,27.002C9.934,27.002,4.998,22.066,4.998,16S9.934,4.998,16,4.998S27.002,9.934,27.002,16
          S22.066,27.002,16,27.002z"/><path d="M16.02,7.002c-0.001,0-0.001,0-0.002,0c-0.551,0-0.999,0.446-1,0.998l-0.015,7h-5.001c-0.552,0-1,0.448-1,1s0.448,1,1,1H16
          c0.551,0,0.999-0.446,1-0.998l0.018-7.998C17.019,7.452,16.572,7.003,16.02,7.002z"/></svg>
          <div>Votação ainda não encerrou.<div/>
        <div/>
        `


    if (encerrou)
      html = `
          <div style="display:flex;align-itens:center;justify-content:center;text-align:center;font-size:14px">
          <div style="color:#00C551">Sala: ${this.state.sala.titulo}<div/>
            <div style="color:#8400C5"><b>${sala.descricao} <b><div/>
            <br/><br/><br/><br/>
            <?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" fill=#8400C5 width="64px" height="64px" viewBox="0 0 512 512" xml:space="preserve"><path d="M239.208 343.937c-17.78 10.103-38.342 15.876-60.255 15.876-21.909 0-42.467-5.771-60.246-15.87C71.544 358.331 42.643 406 32 448h293.912c-10.639-42-39.537-89.683-86.704-104.063z"/><path d="M178.953 120.035c-58.479 0-105.886 47.394-105.886 105.858 0 58.464 47.407 105.857 105.886 105.857s105.886-47.394 105.886-105.857c0-58.464-47.408-105.858-105.886-105.858zm0 186.488c-33.671 0-62.445-22.513-73.997-50.523H252.95c-11.554 28.011-40.326 50.523-73.997 50.523z"/><g><path d="M322.602 384H480c-10.638-42-39.537-81.691-86.703-96.072-17.781 10.104-38.343 15.873-60.256 15.873-14.823 0-29.024-2.654-42.168-7.49-7.445 12.47-16.927 25.592-27.974 34.906C289.245 341.354 309.146 364 322.602 384z"/><path d="M306.545 200h100.493c-11.554 28-40.327 50.293-73.997 50.293-8.875 0-17.404-1.692-25.375-4.51a128.411 128.411 0 0 1-6.52 25.118c10.066 3.174 20.779 4.862 31.895 4.862 58.479 0 105.886-47.41 105.886-105.872 0-58.465-47.407-105.866-105.886-105.866-37.49 0-70.427 19.703-89.243 49.09C275.607 131.383 298.961 163 306.545 200z"/></g><metadata><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#" xmlns:dc="http://purl.org/dc/elements/1.1/"><rdf:Description about="https://iconscout.com/legal#licenses" dc:title="android,contacts" dc:description="android,contacts" dc:publisher="Iconscout" dc:date="2017-09-24" dc:format="image/svg+xml" dc:language="en"><dc:creator><rdf:Bag><rdf:li>Benjamin J Sperry</rdf:li></rdf:Bag></dc:creator></rdf:Description></rdf:RDF></metadata></svg>     
            <div style="color:#00C551">${this.getVotosRealizados()} dos usuários votaram<div/>
            <br/><br/>
            <svg xmlns="http://www.w3.org/2000/svg" fill=#8400C5 width="64" height="64" enable-background="new 0 0 32 32" viewBox="0 0 32 32"><path d="M16,2.998C8.831,2.998,2.998,8.831,2.998,16c0,7.169,5.833,13.002,13.002,13.002c7.169,0,13.002-5.833,13.002-13.002
            C29.002,8.831,23.169,2.998,16,2.998z M16,27.002C9.934,27.002,4.998,22.066,4.998,16S9.934,4.998,16,4.998S27.002,9.934,27.002,16
            S22.066,27.002,16,27.002z"/><path d="M16.02,7.002c-0.001,0-0.001,0-0.002,0c-0.551,0-0.999,0.446-1,0.998l-0.015,7h-5.001c-0.552,0-1,0.448-1,1s0.448,1,1,1H16
            c0.551,0,0.999-0.446,1-0.998l0.018-7.998C17.019,7.452,16.572,7.003,16.02,7.002z"/></svg>
            <div>Votação encerrou em: ${getStatus(
        sala.dataFinal,
        sala.dataInicial,
        sala.horaFinal,
        sala.horaInicial,
        true
      )}
            <div/>
          <div/>
          `


    try {
      const { uri } = await Print.printToFileAsync({ html });
      Sharing.shareAsync(uri, {})
    } catch (errar) {
      console.error(err);
    }
  }

  getVotosRealizados = () => {
    const { votantes, questoes } = this.state.sala;
    if (votantes && questoes) {
      const qtdVotantes = votantes.length;
      let count = 0;
      let { alternativas } = questoes[0];
      alternativas.forEach(element => {
        if (element && element[1]) {
          //contabiliza a qtd de votos nas alternativas da questão[0], já que é obrigatório votar em somente uma.
          count = count + element[1];
        }
      });
      const porcentagem = 100 * count / qtdVotantes;
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
          <StatusVotacao tipo='usuario' texto={`${this.getVotosRealizados() || 0}% dos usuários votaram`} />
          <StatusVotacao tipo='hora' texto={
            encerrou ? 'Votação encerrou em: ' +
              getStatus(
                sala.dataFinal,
                sala.dataInicial,
                sala.horaFinal,
                sala.horaInicial,
                true
              ) : "Votação ainda não encerrou."
          } />
        </View>
        <BotaoGrande texto="Andamento" onPress={() => this.andamentoVotos()} />
        <BotaoGrande texto="Compartilhar" onPress={() => this.compartilharAndamento(sala, andamento, encerrou)} />
      </View>
    );
  }
}