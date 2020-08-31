import React, { Component } from 'react';  
import { View, Image, TouchableOpacity,Text, StyleSheet, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import { auth } from '../config';
import InputEmail from '../components/InputEmail';
import InputSenha from '../components/InputSenha';
import styles from '../styles/estilos';

export default class Login extends Component {
    constructor(props) {
        super(props) 
        this.state = {
          salas: {},
          email: 'email@id.com',
          senha: '123456',
          errorMessage:''
        }      
    }

    handleLogin = () => {
      const { email, senha } = this.state;
      auth
        .signInWithEmailAndPassword(email, senha)
        .then((data) => {
            AsyncStorage.setItem('@UID', data.user.uid).then(
              () => this.props.navigation.navigate('Inicio')
            )
        })
        .catch(error => {
          console.log(error);
          this.setState({ errorMessage: 'E-mail ou senha incorretos.' })
        })
    }

    static navigationOptions = {
        title: 'Bem-vind@ ao eVote!'
    };

    static getUID = () => {
      return AsyncStorage.getItem()
    }

    render(){
      return(
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled number="2">
          <View style={styles.loginContainer}>
            <Image resizeMode="contain" style={styles.logo} source={require("../../assets/icon.png")} />
          </View>
          <View style={{flex: 3}}>
            <InputEmail 
                autoCorrect={false} 
                keyboardType='email-address'
                returnKeyType="next"
                label={'login'}
                onChangeText={email => this.setState({ email })}
                value={this.state.email} 
                placeholder='E-mail' />

              <InputSenha   
                autoCorrect={false} 
                returnKeyType="go"  
                placeholder='Senha'
                label={'senha'}
                onChangeText={senha => this.setState({ senha })}
                value={this.state.senha}/>

            <Text style={custom.notice}> 
              {this.state.errorMessage}
            </Text>


          </View>
          <View style={{flex: 3, backgroundColor: 'white'}}>
            <TouchableOpacity style={styles.loginButtonContainer} 
              onPress={() => {this.setState({ errorMessage: 'Por favor, aguarde.' }), this.handleLogin()}}>
              <Text style={styles.loginButtonText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButtonContainer} 
              onPress={() => this.props.navigation.navigate('TelaCadastro')}>
              <Text style={styles.loginButtonText}>Cadastrar</Text>
            </TouchableOpacity> 
          </View>

        </KeyboardAvoidingView>
        );  
     }
}

const custom = StyleSheet.create({
  notice:{
    color: '#8400C5',
    textAlign: 'center'
  }
});