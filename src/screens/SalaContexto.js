import React, { Component } from 'react';  
import { View, Text } from 'react-native';
import { DocumentPicker } from 'expo';
import { app } from '../config';

import BotaoAnterior from '../components/BotaoAnterior';
import BotaoEnvioArquivo from '../components/BotaoEnvioArquivo'
import BotaoProximo from '../components/BotaoProximo';
import Progresso from '../components/Progresso';
import InputTexto from '../components/InputTexto';
import styles from '../styles/estilos';
import sala from '../styles/sala';

export default class SalaContexto extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      sala: {},
      informacao_adicional: "",
      erro: "",
      url_pdf: null,
      loading: null,
      loaded: null
    };
  }
  static navigationOptions = {
    title: 'Criar Sala',
    headerLeft: null
  };

  handleFile = async () => {
    this.setState({sala});
    let result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
      if (!result.cancelled) {
        this.upload(result.uri, result.name)
          .then(() => 
          {
            if (result.uri) {
              this.setState({ url_pdf: result.uri, loading: false, loaded: true });
            }
          })
          .catch((error) => {
            alert('Falha no upload, verifique a conexão.\n erro:', error);
          });
      }
  }

  urlToBlob = (uri) => {
    //reference: https://github.com/expo/expo/issues/2402
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response); // when BlobModule finishes reading, resolve with the blob
      };
      xhr.onerror = function() {
        reject(new TypeError('Network request failed')); // error occurred, rejecting
      };
      xhr.responseType = 'blob'; // use BlobModule's UriHandler
      xhr.open('GET', uri, true); // fetch the blob from uri in async mode
      xhr.send(); // no initial data
    });
  }

  upload = async (uri, name) => {
    if(uri) {
      this.setState({loading: true, loaded: false});
      const blob = await this.urlToBlob(uri);
      const ref = app.storage().ref().child('sala/pdfs/'+name);
      const snap = await ref.put(blob);
      const remoteUri = await snap.ref.getDownloadURL();

      blob.close();
      return remoteUri;
    }
    return null;
  }

  handleInfo = (value) => {
    this.setState({informacao_adicional: value});
  }

  handleSubmit = (salaParte1) => {
    let { informacao_adicional, url_pdf } = this.state;
    
    let salaAtualizada = salaParte1;  
    if(url_pdf) {
      salaAtualizada = Object.assign(salaParte1, {'url_pdf':  url_pdf});
      salaAtualizada = Object.assign(salaParte1, {'informacao_adicional':  informacao_adicional});
      this.setState({sala: salaAtualizada});
    }

    this.props.navigation.navigate('Questao',
     {
        sala: salaAtualizada
    }
    );
  }

  render() {
    let { loading, loaded } = this.state;
    const { informacao_adicional } = this.state;
    const { navigation } = this.props;
    let salaParte1 = navigation.getParam('sala', 'sem dados');
    return (
      <View style={styles.container}>
        <View styles={styles.innerContainer}>
          <Text style={[styles.title2, { marginTop: 20, marginBottom: 20 }]}>Informações que ficarão em destaque:</Text>
          <BotaoEnvioArquivo
            loaded={!!loaded}
            loading={!!loading}
            style={sala.button}
            texto="Anexar PDF"
            onPress={this.handleFile}
          />

          <InputTexto
            style={sala.input}
            label="Informações adicionais"
            multiline
            onChangeText={value => this.handleInfo(value)}
            value={informacao_adicional}
          />
        </View>
        
        <View style={styles.flowButtonsContainer}>
          <BotaoAnterior
            disabled={!!loading}
            endereco='Sala' 
            navigation={this.props.navigation} 
            style={styles.icon} 
          />
          <Progresso quantidade={2} total={5}/>
          <BotaoProximo
            disabled={!!loading}
            onPress={() => this.handleSubmit(salaParte1)}
            endereco='Questao' 
            navigation={this.props.navigation} 
            style={styles.icon} 
          />
        </View>
      </View>
    );
  }
}
