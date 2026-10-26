// Conecta o JavaScript aos elementos do HTML.
const numeroAcessos = document.querySelector("#acessos");
const botaoAtualizar = document.querySelector("#atualizar-acessos");
const botaoRestaurar = document.querySelector("#restaurar-acessos");
const campoFiltro = document.querySelector("#filtro-tabela");
const linhasTabela = document.querySelector("#linhas-tabela");
const campoNovoNome = document.querySelector("#novo-nome");
const botaoAdicionarPessoa = document.querySelector("#adicionar-pessoa");
const mensagemVazia = document.querySelector("#sem-resultados");
const contadorLinhas = document.querySelector("#contador-linhas");

const ACESSOS_INICIAIS = 1248;
const acessosSalvos = localStorage.getItem("acessos");
const pessoasSalvas = JSON.parse(
  localStorage.getItem("pessoas-adicionadas") || "[]"
);

// Recupera os acessos salvos anteriormente neste navegador.
if (acessosSalvos !== null) {
  numeroAcessos.textContent =
    Number(acessosSalvos).toLocaleString("pt-BR");
}

// Monta uma linha da tabela para uma pessoa.
function criarLinhaPessoa(nome, dataRegistro) {
  const novaLinha = document.createElement("tr");

  const pessoa = document.createElement("td");
  pessoa.textContent = nome;

  const atividade = document.createElement("td");
  atividade.textContent = "Cadastro";

  const data = document.createElement("td");
  data.textContent = dataRegistro;

  const status = document.createElement("td");
  const etiqueta = document.createElement("span");
  etiqueta.className = "etiqueta andamento";
  etiqueta.textContent = "Em andamento";
  status.append(etiqueta);

  novaLinha.append(pessoa, atividade, data, status);
  return novaLinha;
}

// Recria na tabela as pessoas guardadas neste navegador.
pessoasSalvas.forEach((pessoaSalva) => {
  linhasTabela.append(
    criarLinhaPessoa(pessoaSalva.nome, pessoaSalva.data)
  );
});

// Aplica o filtro e atualiza o contador.
function aplicarFiltro() {
  const busca = campoFiltro.value.trim().toLocaleLowerCase("pt-BR");
  const linhas = document.querySelectorAll("#linhas-tabela tr");
  let quantidadeVisivel = 0;

  linhas.forEach((linha) => {
    const textoLinha = linha.textContent.toLocaleLowerCase("pt-BR");
    const corresponde = textoLinha.includes(busca);

    linha.hidden = !corresponde;
    if (corresponde) quantidadeVisivel += 1;
  });

  if (quantidadeVisivel === 1) {
    contadorLinhas.textContent = "1 registro encontrado";
  } else {
    contadorLinhas.textContent =
      quantidadeVisivel + " registros encontrados";
  }

  mensagemVazia.hidden = quantidadeVisivel > 0;
}

// O botão soma 10 e guarda o novo valor.
botaoAtualizar.addEventListener("click", () => {
  const valorAtual = Number(
    numeroAcessos.textContent.replaceAll(".", "")
  );
  const novoValor = valorAtual + 10;

  numeroAcessos.textContent = novoValor.toLocaleString("pt-BR");
  localStorage.setItem("acessos", novoValor);
});

// O botão de restauração apaga o valor salvo e volta ao inicial.
botaoRestaurar.addEventListener("click", () => {
  localStorage.removeItem("acessos");
  numeroAcessos.textContent =
    ACESSOS_INICIAIS.toLocaleString("pt-BR");
});

// O botão cria uma pessoa e salva seus dados no navegador.
botaoAdicionarPessoa.addEventListener("click", () => {
  const nome = campoNovoNome.value.trim();
  if (nome === "") return;

  const pessoaNova = {
    nome: nome,
    data: new Date().toLocaleDateString("pt-BR"),
  };

  pessoasSalvas.push(pessoaNova);
  localStorage.setItem(
    "pessoas-adicionadas",
    JSON.stringify(pessoasSalvas)
  );

  linhasTabela.append(
    criarLinhaPessoa(pessoaNova.nome, pessoaNova.data)
  );

  campoNovoNome.value = "";
  campoFiltro.value = "";
  aplicarFiltro();
});

// Atualiza filtro e contador enquanto você digita.
campoFiltro.addEventListener("input", aplicarFiltro);

// Conta todas as linhas também quando a página abre.
aplicarFiltro();
