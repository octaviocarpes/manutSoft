import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import { View, Text, StyleSheet } from "react-native";

export default class DateInput extends Component {
  constructor(props){
    super(props)
    this.state = {date: null}
  }
  handleDateChange = (data) => {
        this.setState({date: data});
        this.props.onDateChange(data);
  }
 
  render(){
      const { titulo, maxDate, minDate } = this.props;
      const { date } = this.state;
      const dateNow = moment(new Date()).format("D/M/Y").toString();
    return (
    <View style={styles.container}>
      <Text style={styles.texto} >
        {titulo}
      </Text>

      <DatePicker
        date={date}
        mode="date"
        placeholder={dateNow}    
        iconSource={require("../../assets/_ionicons_svg_md-calendar.png")}
        format="DD/MM/YYYY"
        confirmBtnText="Confirmar"
        cancelBtnText="Cancelar"
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
            borderBottomWidth: 0.5,
            borderColor: "#7500CF",
            marginLeft:0,
            marginRight: 10,
            width: 130,
          }
        }}
        maxDate={maxDate}
        minDate={minDate}
        onDateChange={(date) => {this.handleDateChange(date)}}
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

DateInput.propTypes = {
  onDateChange: PropTypes.func.isRequired,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
  titulo: PropTypes.string.isRequired
}

DateInput.defaultProps = {
  minDate: moment(new Date()).format("D/M/Y").toString(),
  maxDate: undefined
}
