function QuestaoModel (titulo, informacoes, alternativas) {
	this.titulo = titulo,
  this.informacoes = informacoes,
  this.alternativas = alternativas,
    
  this.toString = function() {
		return `Pergunta: ${this.titulo}`;
	}
}

export default QuestaoModel;