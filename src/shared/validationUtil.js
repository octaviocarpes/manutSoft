const isEmailValido = entrada => {
    if(entrada.includes('@')) return true
    return false
}
const isNomeValido = entrada => {
    if(entrada.length > 0) return true
    return false
}

const isCPFValido = entrada => {
    let Soma;
    let Resto;
    Soma = 0;
  if (entrada == "00000000000") return false;
     
  for (i=1; i<=9; i++) Soma = Soma + parseInt(entrada.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;
   
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(entrada.substring(9, 10)) ) return false;
   
  Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(entrada.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;
   
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(entrada.substring(10, 11) ) ) return false;
    return true;
}

const isSenhaValido = entrada => {
    if(entrada.length > 8) return true
    return false
}

const isValido = () => {

}

