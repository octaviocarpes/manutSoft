import React, { Component } from "react"
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import DatePicker from 'react-native-datepicker';

export default class TimeInput extends Component{
    constructor(props){
        super(props)
        this.state = {time: null}
    }
    handleTime = (date) => {
        this.setState({time: date});
        this.props.onTimeChange(date);
    }

    render(){
        const { time } = this.state;
        const { titulo } = this.props;
        return( 
            <View style={styles.container}>
                <Text style={styles.texto}>
                    {titulo}
                </Text>
                <DatePicker
                    date={time}
                    mode="time"
                    placeholder="00:00"
                    format="HH:mm"
                    confirmBtnText="Confirmar"
                    cancelBtnText="Cancelar"
                    iconSource={require("../../assets/_ionicons_svg_md-time.png")}
                    customStyles={{
                    dateIcon: {
                      position: 'relative',
                      right: 15,
                      top: 5,
                      marginRight: 0
                    },
                    dateInput: {
                      alignSelf:"flex-start",
                      borderTopWidth: 0,
                      borderLeftWidth: 0,
                      borderRightWidth: 0,
                      borderBottomWidth: 1,
                      borderColor: "#7500CF",
                      borderBottomWidth: 0.5,
                      marginLeft:0,
                      marginRight: 10,
                      width: 130,
                    }
                }}
                    onDateChange={(date) => this.handleTime(date)}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      marginBottom: 12,
      marginTop: 22
    },
    texto: {
      fontSize: 16,
      fontWeight: 'normal',
      color: "#8400C5",
    },
  });

TimeInput.propTypes = {
    onTimeChange: PropTypes.func.isRequired,
    titulo: PropTypes.string.isRequired
}
