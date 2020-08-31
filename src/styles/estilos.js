import {StyleSheet} from "react-native"

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15
    },
    containerKeyboard: {
        flex: 1, 
        flexDirection: 'column',
        justifyContent: 'center',
    },
    flowButtonsContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    PrincipalView: {
        flexDirection: 'row',
        justifyContent: 'space-between'  
    },
    PrimeiraView: {
        justifyContent: 'flex-start'  
    },
    SegundaView: {
        justifyContent: 'flex-end'  
    },
    innerContainer: {
        paddingTop: 50,
        justifyContent: 'space-around'
    },
    title2: {
        alignSelf: 'center',
        color: '#9B9B9B',
        fontSize: 16
    },
    boxAlternativa:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    loginContainer:{
        alignItems: 'center',
        flex: 2,
        justifyContent: 'center'
    },
    logo: {
        position: 'absolute',
        width: 300,
        height: 100
    },
    loginInput:{
        height: 40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#fff'
    },
    loginButtonContainer:{
        margin: 10,
        backgroundColor: '#8400C5',
        paddingVertical: 15
    },
    loginButtonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    }
});