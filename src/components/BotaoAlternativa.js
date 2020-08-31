import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const alfabeto = ['a', 'b',	'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
export default BotaoAlternativa = ({ selectedIndex, index, text, onPress }) => {
const cor = selectedIndex == index ? { backgroundColor: '#00E576' } : { backgroundColor: '#7500CF' }
    return (
        <TouchableOpacity
            style={[styles.buttonStyle, cor, { minHeight: 35 }]}
            onPress={onPress} 
        >
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 5 }}>
                <Text style={{ color: '#ffffff', fontSize: 15, fontWeight: 'bold' }}>{alfabeto[index]})</Text>
                <Text style={{ color: '#ffffff', fontSize: 15, paddingLeft: 5 }}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
}

BotaoAlternativa.propTypes = {
    selectedIndex: PropTypes.number,
    index: PropTypes.number,
    text: PropTypes.string,
    onPress: PropTypes.func.isRequired
};

BotaoAlternativa.defaultProps = {
    selectedIndex: 0
};

const styles = StyleSheet.create({
    buttonStyle: {
        alignSelf: 'center',
        padding: 5,
        borderRadius: 50,
        justifyContent: 'center',
        margin: 10,
        width: 330,
        flexDirection: 'row'
    }
});