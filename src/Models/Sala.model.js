function SalaModel (administrador, titulo, informacoes, questoes, convidados) {
	this.administrador = administrador,
  this.titulo = titulo,
  this.informacoes = informacoes,
  this.questoes = questoes,
  this.convidados = convidados,
    
  this.toString = function() {
		return `sala do ${this.administrador}`;
	}
}

export default SalaModel;