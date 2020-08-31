import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class Barra extends Component {
  constructor(props) {
    super(props);
  }
	render() {
    const { onPress, index } = this.props;
		return (
			<View style={styles.container}>
          <MyButton 
            active={index}
            onPress={onPress}
            text={'Votações'}
            name={'md-checkbox-outline'} 
          />
          <MyButton 
            active={!index}
            onPress={onPress}
            text={'Histórico'}
            name={'md-time'} 
          />
      </View>
		);
	}
}

Barra.propTypes = {
  onPress: PropTypes.func.isRequired,
  index: PropTypes.bool
};

Barra.defaultProps = {
  index: false
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      height: 50,
      borderTopWidth: 1,
      borderColor: '#ddd',
      margin: 5
    },
    button: {
      alignItems: 'center',
      paddingTop: 5
    },
    text: {
      textAlign: 'center',
      fontSize: 13
    }
});

MyButton = ({active, onPress, text, name}) => {
    return (
      <TouchableOpacity
        disabled={!active}
        onPress={onPress}
      >
      {
        active
        ? <View style={styles.button}>
            <Icon
              name={name}
              size={25} 
              color="#8400C5"
            />
            <Text style={[{color:"#8400C5"}, styles.text]}>{text}</Text>
          </View>
    
        : <View style={styles.button}>
            <Icon 
              name={name} 
              size={25} 
              color="#00E576"
            />
            <Text style={[{color:"#00E576"}, styles.text]}>{text}</Text>
          </View>
        }
      </TouchableOpacity>
    )
  }

export default Barra;