// Buscamos os elementos do HTML pelo id para poder reagir ao que acontece na página.
   
const numeroAcessos = document.querySelector("#acessos");
const botaoAtualizar = document.querySelector("#atualizar-acessos");
const campoFiltro = document.querySelector("#filtro-tabela");
const linhasTabela = document.querySelector("#linhas-tabela");
const campoNovoNome = document.querySelector("#novo-nome");
const botaoAdicionarPessoa = document.querySelector("#adicionar-pessoa");
const mensagemVazia = document.querySelector("#sem-resultados");
const contadorLinhas = document.querySelector("#contador-linhas");
const acessosSalvos = localStorage.getItem("acessos");
const botaoRestaurar = document.querySelector("#restaurar-acessos");

if (acessosSalvos !== null) {
  numeroAcessos.textContent =
    Number(acessosSalvos).toLocaleString("pt-BR");
}

// No clique, somamos um ao número de exemplo e atualizamos o cartão.
botaoAtualizar.addEventListener("click", () => {
  const valorAtual = Number(numeroAcessos.textContent.replaceAll(".", ""));
  const novoValor = valorAtual + 10;
  numeroAcessos.textContent = novoValor.toLocaleString("pt-BR");
  localStorage.setItem("acessos", novoValor);
   });
   botaoRestaurar.addEventListener("click", () => {
  localStorage.removeItem("acessos");
  numeroAcessos.textContent = "1.248";
      }); 

// fecha o evento Restaurar acessos
      function criarLinhaPessoa(nome) {
  const novaLinha = document.createElement("tr");

  const pessoa = document.createElement("td");
  pessoa.textContent = nome;

  const atividade = document.createElement("td");
  atividade.textContent = "Cadastro";

  const data = document.createElement("td");
  data.textContent = new Date().toLocaleDateString("pt-BR");

  const status = document.createElement("td");
  const etiqueta = document.createElement("span");
  etiqueta.className = "etiqueta andamento";
  etiqueta.textContent = "Em andamento";
  status.append(etiqueta);

  novaLinha.append(pessoa, atividade, data, status);
  return novaLinha;
}
      botaoAdicionarPessoa.addEventListener("click", () => {
  const nome = campoNovoNome.value.trim();
  if (nome === "") return;

  linhasTabela.append(criarLinhaPessoa(nome));

  campoNovoNome.value = "";
  campoFiltro.value = "";
  campoFiltro.dispatchEvent(new Event("input"));
});

// A cada digitação, comparamos a busca com o conteúdo de cada linha.
campoFiltro.addEventListener("input", () => {
  const busca = campoFiltro.value.trim().toLocaleLowerCase("pt-BR");
  let quantidadeVisivel = 0;
   const linhas = document.querySelectorAll("#linhas-tabela tr");

linhas.forEach((linha) => {
  const textoLinha = linha.textContent.toLocaleLowerCase("pt-BR");
  const corresponde = textoLinha.includes(busca);

  linha.hidden = !corresponde;
  if (corresponde) quantidadeVisivel += 1;
}); // fecha o forEach

if (quantidadeVisivel === 1) {
  contadorLinhas.textContent = "1 registro encontrado";
} else {
  contadorLinhas.textContent = quantidadeVisivel + " registros encontrados";
}

  // Mostramos esta mensagem somente quando o filtro não encontra nenhuma linha.
  mensagemVazia.hidden = quantidadeVisivel > 0;
});
