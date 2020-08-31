import React, { Component } from 'react';
import { 
    View,
    StyleSheet,
    KeyboardAvoidingView,
    AsyncStorage,
    ActivityIndicator } from 'react-native';
import InputTexto from '../components/InputTexto';
import styles from '../styles/estilos';
import InputEmail from '../components/InputEmail';
import InputSenha from '../components/InputSenha';
import BotaoGrande from '../components/BotaoGrande';
import Aviso from '../components/Aviso';
import { auth, db } from '../config';

export default class TelaCadastro extends Component{
    constructor(props) {
        super(props) 
        this.state = {
          salas: {},
          email: '',
          senha: '',
          senhaConfirma: '',
          cpf: '',
          nome: '',
          errorMessage: '',
          errorEmail: '',
          errorSenha: '',
          errorCPF: '',
          errorNome: '',
          loading: false
        }      
    }

    validate = async () => {
        let error = '';
        await this.isNomeValido();
        await this.isEmailValido();
        await this.isCPFValido();
        await this.isSenhaValido();

        if(this.state.errorNome){
            error = 'nome';
            this.setState({errorMessage: this.state.errorNome});
        }else if(this.state.errorEmail){
            this.setState({errorMessage: this.state.errorEmail});
            error = 'email'
        }else if(this.state.errorCPF){
            error = 'cpf'
            this.setState({errorMessage: this.state.errorCPF});
        }else if(this.state.errorSenha){
            error = 'senha'
            this.setState({errorMessage: this.state.errorSenha});
        } else {
            await this.handleSignUp();
        }
          return error;    
      }

   
    handleSignUp = async () => {
        const { email, senha, nome, cpf } = this.state;
        this.setState({loading: true});
        const retornoCriacao = await auth.createUserWithEmailAndPassword(email,senha)
            .catch(error => this.setState({ errorMessage: error.message, loading: false }));
        
        const uid = retornoCriacao.user.uid;
        await Promise.all(
            db.ref('usuarios/').push({email, uid, nome, cpf}),
            AsyncStorage.setItem('@UID', uid))
        this.props.navigation.navigate('Inicio')
    }   

    static navigationOptions = {
        title: 'Registrar       ',
    };


    render(){
        const { loading } = this.state;
        return(
        loading?
        <ActivityIndicator 
            style={stylesLoading.iconStatusLoading}
            animating={loading}
            size="large"
            color="#00DC7B"
        /> :
        <KeyboardAvoidingView behavior={"padding"} style={styles.container} enabled number="2">   
            <View style={{flex: 1} [styles.flowButtonsContainer, { marginTop: 5 }]}> 
                <Aviso texto={this.state.errorMessage} />
                <InputTexto
                    label="Nome"
                    value={this.state.nome}
                    onChangeText={nome => this.setState({ nome, errorNome: '', errorMessage: '' })}/>
                <InputEmail 
                    autoCorrect={false} 
                    keyboardType='email-address'
                    returnKeyType="next"
                    onChangeText={email => this.setState({ email, errorEmail: '', errorMessage: '' })}
                    value={this.state.email} 
                    label='E-mail' />
                <InputTexto
                    label= "CPF"
                    value={this.state.cpf}
                    onChangeText={cpf => this.setState({ cpf, errorCPF: '', errorMessage: '' })}/>
            </View>
            <View style={{flex: 2, backgroundColor: 'white'} }>
                <InputSenha
                    autoCorrect={false} 
                    returnKeyType="go" 
                    ref={(input)=> this.passwordInput = input} 
                    label='Senha'
                    onChangeText={senha => this.setState({ senha, errorSenha: '', errorMessage: '' })}
                    value={this.state.senha}
                />
                <InputSenha
                    autoCorrect={false} 
                    returnKeyType="go" 
                    ref={(input)=> this.passwordInput = input} 
                    label='Confirmar senha'
                    onChangeText={senhaConfirma => this.setState({ senhaConfirma, errorSenha: '', errorMessage: '' })}
                    value={this.state.senhaConfirma}
                />
                <BotaoGrande
                    texto="Confirmar"
                    onPress={ () => this.validate()}
                    endereco='Login' 
                    navigation={this.props.navigation} 
                />
            </View>
    </KeyboardAvoidingView>      
        )
    }

    // utilizada classe '../shared/validationUtil.js'
    isEmailValido = () => {
        const { email } = this.state;
        if(email.includes('@')) return true
        return this.setState({errorEmail : 'Email inválido'});
    }
    isNomeValido = () => {
        const { nome } = this.state;
        if(nome.length > 0 && nome.length < 100) return true
        return this.setState({errorNome : 'Nome deve ter de 1 a 100 caracteres'});
    }

    isCPFValido = () => {
        let Soma;
        let Resto;
        let validated = true;
        Soma = 0;
        if(this.state.cpf.length != 11){
            return this.setState({errorCPF : 'CPF deve ter 11 numeros'});
        }

        if (this.state.cpf == "00000000000") validated = false;
        
        for (i=1; i<=9; i++) Soma = Soma + parseInt(this.state.cpf.substring(i-1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;
    
        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(this.state.cpf.substring(9, 10)) ) validated = false;
    
        Soma = 0;
        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(this.state.cpf.substring(i-1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;
    
        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(this.state.cpf.substring(10, 11) ) ) validated = false;

        if(validated==false)this.setState({errorCPF : 'CPF inválido'});

        return validated;
    }

    //Fazer validação para senha e confirmação de senha
    isSenhaValido = () => {
        const {senha, senhaConfirma} = this.state;
        if(senha.length >= 6 && senhaConfirma.length >= 6){
            if(senha === senhaConfirma){
                return true;
            } else {
                return this.setState({errorSenha : 'As senhas não batem.'})
            }
        } else {
            return this.setState({errorSenha : 'Senha deve ter pelo menos 6 caracteres'});
        }
    }
}

const stylesLoading = StyleSheet.create({
    iconStatusLoaded: {
        justifyContent: 'flex-end',
        paddingLeft: 5,
        marginTop: 45
    },
    iconStatusLoading: {
        justifyContent: 'center',
        paddingLeft: 5,
        marginTop: 22
    }
  })

