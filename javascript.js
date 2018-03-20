var totalPerguntas = [{
    pergunta: "Quanto é 5x2?",
    alternativas: [10, 25, 20, 12],
    alternativaCorreta: 0
},{
    pergunta: "Quanto é 5x3?",
    alternativas: [10, 15, 20, 12],
    alternativaCorreta: 1
},{
    pergunta: "Quanto é 5x4?",
    alternativas: [10, 25, 20, 12],
    alternativaCorreta: 2
}]

var questaoAtual = 0
var pontuacao = 0
var questaoTemp = []
var qtPerguntas = totalPerguntas.length

console.log(qtPerguntas)

var questao = document.getElementById("questao")
var alternativas = document.getElementById("alternativas")

criarQuestao = () => {
    var novaQuestao = totalPerguntas[questaoAtual].pergunta
    questao.innerHTML = questaoAtual + " --- " + novaQuestao
    
}

criarAlternativas = () => {
    for(var i = 0; i < 4; i++){
        var p = document.getElementsByTagName("p")[i]
        var radio = "<input id='alt_"+i+"' type='radio' name='alternativas' value='"+i+"' >"+ totalPerguntas[questaoAtual].alternativas[i] +" </input>"
        p.innerHTML = radio        
    }
}

criarBotaoAvancar = () =>{
    if(questaoAtual == 0){    
        var bAvancar = document.getElementById("proxima")
        var botao = "<input id='but_proxima' type='button' name='avancarQuestao'  onclick=proximaPergunta() value='Avancar' >"+ "</input>"
        bAvancar.innerHTML = botao
    }
}

criarBotaoVoltar = () =>{
    if(questaoAtual >= 0){    
        var bVoltar = document.getElementById("anterior")
        var botao = "<input id='but_voltar' type='button' name='voltarQuestao' onclick =voltarPergunta() value='Voltar' >" + "</input>"
        bVoltar.innerHTML = botao
    }
}

criarBotaoFinalizar = () => {
    if(questaoAtual == qtPerguntas - 2){    
        var bFinalizar = document.getElementById("finalizar")
        var botao = "<input id='but_finalizar' type='button' name='finalizarQuestao' onclick =finalizarPergunta() value='Finalizar' >" + "</input>"
        bFinalizar.innerHTML = botao
        console.log(bFinalizar)
    }
}

validarMarcacao = () =>{
    var radio = document.getElementsByName("alternativas")
    if(!radio[0].checked && !radio[1].checked && !radio[2].checked && !radio[3].checked ){
        alert("Marque uma opcao")
    }
}

calcularPontuacao = () => {
    var radio = document.querySelector('input[name="alternativas"]:checked').value
    questaoTemp[questaoAtual] = radio
    if(radio == totalPerguntas[questaoAtual].alternativaCorreta){
        pontuacao ++
    }
}

proximaPergunta = () => {
    validarMarcacao()
    calcularPontuacao()
    criarBotaoFinalizar()
    if(questaoAtual >= 0){
        questaoAtual++
        criarBotaoVoltar()
        criarQuestao()
        criarAlternativas()
    }
}

voltarPergunta = () => {
    if(questaoAtual > 0){
        var radio = document.getElementsByName("alternativas")
        questaoAtual--
        criarBotaoVoltar()
        criarQuestao()
        criarAlternativas()
        var len = radio.length
        for(var i =0; i< len; i++){
            if(radio[i].value == questaoTemp[questaoAtual]){
                radio[i].checked = true
            }
        }

    }
}

finalizarPergunta = () => {
    calcularPontuacao()
    validarMarcacao() 
    var resultado = document.getElementById("resultado")
    resultado.innerHTML = pontuacao
}

window.onload = criarQuestao();
window.onload = criarAlternativas();
window.onload = criarBotaoAvancar()
