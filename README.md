### eVote - Aplicativo de votação online  

---

**Atenção**: Evite alterar as versões das dependências utilizadas no *package.json*.

Em alguns casos, é preferível mantê-las desatualizadas, por questões de compatibilidade. 

Não troque a versão da dependência 'react', ou o Expo pode vir a ter *crashes*. 

---

Antes de mais nada, instale o Expo no seu celular! [iOS](https://itunes.apple.com/us/app/expo-client/id982107779?mt=8) [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=pt_BR)

Isso tornará as coisas mais fáceis na hora de testar a aplicação, direto no smartphone. 

E se ainda não tem o Node instalado, baixe [no site oficial](https://nodejs.org/en/download/). (o NPM vem daí!)

---

Se for sua primeira vez executando, abra o terminal como admin: 

Execute o PowerShell como Administrador no Windows, ou use o comando *sudo su* no Linux ou Mac.

E instale o Explo globalmente:

```
npm install expo-cli --global
```

Não se preocupe se aparecerem algums erros no log. A instalação terá ocorrido, de qualquer forma.

---

Acesse uma pasta pelo terminal e baixe o projeto:

```
git clone -b dev http://joao.lerina@www.tools.ages.pucrs.br/VotacaoOnLine/rn-votacaoonline.git
```
Atente ao nome de aluno. A URL pode ser copiada abaixo do nome do projeto, na página do repositório.

A seguir, entre na pasta do projeto importado, com:

```
cd RN-eVote
```
Dentro do diretório, execute a instalação dos pacotes com o NPM:
```
npm install
```
Perceba que foi criada uma pasta *node_modules*. Alí, estão as centenas de dependências necessárias para executar a aplicação React Native. Algumas delas estão especificadas no *package.json*.

Concluída a instalação dos módulos, execute o bundler do Expo:
```
npm start
```
---

Aparecerá um QR-Code no terminal, e o bundler será aberto no navegador também.

Vá nessa página e atente às opções de conexão com o dispositivo: Tunnel, LAN e Local. 

O ideal é deixar marcada em LAN, porém o celular deverá estar conectado na AGES_WIFI, e não em outras redes, como eduroam (a menos que o seu computador esteja em uma dessas outras redes). O que importa é os dois estarem conectados na mesma.

Se não estiverem na mesma rede, marcar a opção Tunnel resolve. Só que nem sempre o QR Code é refeito para o Tunnel, então acaba demorando mais.

---

Leia, com a câmera, o QR Code do terminal ou do bundler no navegador, e permita que abra o link pelo aplicativo do Expo no seu celular.

Em instantes, o aplicativo será carregado e estará pronto para ter suas funcionalidades testadas.

**Se algo não estiver dando certo, peça ajuda aos colegas.** 🤠

Bom estudo!