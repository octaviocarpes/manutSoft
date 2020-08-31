import moment from 'moment';
export default function getStatus (dataFinal, dataInicial, horaFinal, horaInicial, informacaoExtra) {
  let firstMoment = moment(`${dataInicial} ${horaInicial}`, 'DD/MM/YYYY HH:mm');
  let finalMoment = moment(`${dataFinal} ${horaFinal}`, 'DD/MM/YYYY HH:mm');
  let nowMoment   = moment();

  if(firstMoment.diff(nowMoment)>0)
    return informacaoExtra? `Disponível ${firstMoment.fromNow()}` : 'agendada';
  else if(finalMoment.diff(nowMoment)>=0)
    return informacaoExtra? `Encerra ${finalMoment.fromNow()}` : 'andamento';
  else
    return informacaoExtra? finalMoment.format('DD/MM/YYYY HH:mm') : 'encerrada';
}