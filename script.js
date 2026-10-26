// Buscamos os elementos do HTML pelo id para poder reagir ao que acontece na página.
const numeroAcessos = document.querySelector("#acessos");
const botaoAtualizar = document.querySelector("#atualizar-acessos");
const campoFiltro = document.querySelector("#filtro-tabela");
const linhas = document.querySelectorAll("#linhas-tabela tr");
const mensagemVazia = document.querySelector("#sem-resultados");
const contadorLinhas = document.querySelector("#contador-linhas");

// No clique, somamos um ao número de exemplo e atualizamos o cartão.
botaoAtualizar.addEventListener("click", () => {
  const valorAtual = Number(numeroAcessos.textContent.replaceAll(".", ""));
  const novoValor = valorAtual + 10;
  numeroAcessos.textContent = novoValor.toLocaleString("pt-BR");
  localStorage.setItem("acessos", novoValor);
});

// A cada digitação, comparamos a busca com o conteúdo de cada linha.
campoFiltro.addEventListener("input", () => {
  const busca = campoFiltro.value.trim().toLocaleLowerCase("pt-BR");
  let quantidadeVisivel = 0;

  linhas.forEach((linha) => {
    const textoLinha = linha.textContent.toLocaleLowerCase("pt-BR");
    const corresponde = textoLinha.includes(busca);
    linha.hidden = !corresponde;
    if (corresponde) quantidadeVisivel += 1;
    if (quantidadeVisivel === 1) {
  contadorLinhas.textContent = "1 registro encontrado";
} else {
  contadorLinhas.textContent = quantidadeVisivel + " registros encontrados";
}
    const acessosSalvos = localStorage.getItem("acessos");

if (acessosSalvos !== null) {
  numeroAcessos.textContent =
    Number(acessosSalvos).toLocaleString("pt-BR");
}
  });

  // Mostramos esta mensagem somente quando o filtro não encontra nenhuma linha.
  mensagemVazia.hidden = quantidadeVisivel > 0;
});
