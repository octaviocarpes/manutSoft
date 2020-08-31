import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Inicio from './src/screens/Inicio';
import Historico from './src/screens/Historico';
import VisualizarQuestao from './src/screens/VisualizarQuestao';
import Sala from './src/screens/Sala';
import SalaContexto from './src/screens/SalaContexto';
import Questao from './src/screens/Questao';
import QuestaoContexto from './src/screens/QuestaoContexto';
import QuestaoSalva from './src/screens/QuestaoSalva';
import Convidados from './src/screens/Convidados';
import Andamento from './src/screens/Andamento';
import AndamentoVotos from './src/screens/AndamentoVotos';
import Votacao from './src/screens/Votacao';
import Votar from './src/screens/Votar';
import Login from './src/screens/Login';
import TelaCadastro from './src/screens/TelaCadastro';

import { app } from 'firebase';
import moment from 'moment';

const AppNavigator = createStackNavigator(
  {
    Login,
    Inicio,
    Historico,
    Sala,
    SalaContexto,
    Questao,
    QuestaoContexto,
    QuestaoSalva,
    Convidados,
    Andamento,
    AndamentoVotos,
    Votacao,
    VisualizarQuestao,
    Votar,
    TelaCadastro
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'transparent',
      },
      headerTintColor: '#8400C5',
      headerTitleContainerStyle: {
        justifyContent: 'center',
        textAlign: 'center',
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#00C551',
      }
    },
  }
)

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return (
      <AppContainer />
    )
  }
}

moment.defineLocale('pt-br', {
  months : 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
  monthsShort : 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
  weekdays : 'Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado'.split('_'),
  weekdaysShort : 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
  weekdaysMin : 'Do_2ª_3ª_4ª_5ª_6ª_Sá'.split('_'),
  weekdaysParseExact : true,
  longDateFormat : {
      LT : 'HH:mm',
      LTS : 'HH:mm:ss',
      L : 'DD/MM/YYYY',
      LL : 'D [de] MMMM [de] YYYY',
      LLL : 'D [de] MMMM [de] YYYY [às] HH:mm',
      LLLL : 'dddd, D [de] MMMM [de] YYYY [às] HH:mm'
  },
  calendar : {
      sameDay: '[Hoje às] LT',
      nextDay: '[Amanhã às] LT',
      nextWeek: 'dddd [às] LT',
      lastDay: '[Ontem às] LT',
      lastWeek: function () {
          return (this.day() === 0 || this.day() === 6) ?
              '[Último] dddd [às] LT' : // Saturday + Sunday
              '[Última] dddd [às] LT'; // Monday - Friday
      },
      sameElse: 'L'
  },
  relativeTime : {
      future : 'em %s',
      past : 'há %s',
      s : 'poucos segundos',
      ss : '%d segundos',
      m : 'um minuto',
      mm : '%d minutos',
      h : 'uma hora',
      hh : '%d horas',
      d : 'um dia',
      dd : '%d dias',
      M : 'um mês',
      MM : '%d meses',
      y : 'um ano',
      yy : '%d anos'
  },
  dayOfMonthOrdinalParse: /\d{1,2}º/,
  ordinal : '%dº'
});