import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

export class LoginForm extends Component {
    render(){
        return(
            <View style={styles.container}>
            <TextInput style = {styles.loginInput} 
               autoCapitalize="none" 
               onSubmitEditing={() => this.passwordInput.focus()} 
               autoCorrect={false} 
               keyboardType='email-address' 
               returnKeyType="next" 
               placeholder='Email' 
               placeholderTextColor='rgba(225,225,225,0.7)'/>

            <TextInput style = {styles.loginInput}   
              returnKeyType="go" 
              ref={(input)=> this.passwordInput = input} 
              placeholder='Senha' 
              placeholderTextColor='rgba(225,225,225,0.7)' 
              secureTextEntry/>

                <TouchableOpacity style={styles.loginButtonContainer} 
                     onPress={onButtonPress}>
                    <Text  style={styles.loginButtonText}>LOGIN</Text>
                </TouchableOpacity> 
            </View>
        )
    }
}