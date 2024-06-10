  let numeroTransacao = 1000000;

  function validarCamposObrigatorios(oProduto, aQuantidade, oPrecoUnitario, aDataTransacao) {
    //RN.01 - Validação de Campos Obrigatórios
    return oProduto && aQuantidade != null && oPrecoUnitario != null && aDataTransacao;
  }
  
  function validarQuantidadeProdutos(aQuantidade) {
    //RN.02 - Validação de Quantidade de Produtos
    return aQuantidade > 0;
  }
  
  function validarPrecoUnitario(oPrecoUnitario) {
    //RN.03 - Validação de Preço Unitário
    return oPrecoUnitario > 0;
  }
  
  function registrarDataTransacao() {
    //RN.04 - Registro de Data da Transação
    return new Date().toLocaleString();
  }
  
  
  function registrarHistoricoAlteracao(aMensagem, ehSucesso= true) {
    //RN.06 - Histórico de Alterações
    const ulHistoricoAlteracao = document.getElementById("historicoAlteracao");
    const liHistorico = document.createElement("li");
    const divAlertContainer = document.getElementById("alertContainer");
   
  
    if(ehSucesso){
    divAlertContainer.style.display = "none";
    liHistorico.textContent = aMensagem;
    ulHistoricoAlteracao.appendChild(liHistorico);
    }else {
    divAlertContainer.style.display = "block";
    divAlertContainer.className = "alert alert-info";
    divAlertContainer.innerHTML = "<strong>Atenção!</strong>" + aMensagem;
    }
    
  }
  
  function registrarVenda(produto, quantidade, precoUnitario) {
    let dataTransacao = registrarDataTransacao();
    let elementoSelecionado = document.getElementById("registrador");
    let registrador = elementoSelecionado.options[elementoSelecionado.selectedIndex].value;
    
  
    let validaCamposObrigatorios = validarCamposObrigatorios(produto, quantidade, precoUnitario, dataTransacao);
    let validaQuantidadeProdutos = validarQuantidadeProdutos(quantidade);
    let validaPrecoUnitario = validarPrecoUnitario(precoUnitario);
  
    if (validaCamposObrigatorios) {
      if (validaQuantidadeProdutos) {
        if (validaPrecoUnitario) {
          return {mensagem: "[" + numeroTransacao + "] Transação registrada! " + produto + ", Qtde: " + quantidade + ", Preço: R$" + precoUnitario + ", Data: " + dataTransacao + ". Registrado por: " + registrador,
                  sucesso: true};
        } else {
          return {mensagem: "Problemas na Validação de Preço Unitário!",
                  sucesso: false};
        }
      } else {
        return {mensagem: "Problemas na Validação de Quantidade de Produtos!",
                sucesso: false};
      }
    } else {
      return {mensagem:"Problemas na validação de campos obrigatórios!",
             sucesso: false};
    }
  }
  
  function vender() {
    let produto = document.getElementById("produto").value;
    let quantidade = document.getElementById("quantidade").value;
    let precoUnitario = document.getElementById("preco").value;
  
    const objeto = registrarVenda(produto, quantidade, precoUnitario);
  
    registrarHistoricoAlteracao(objeto.mensagem, objeto.sucesso);
    numeroTransacao += 1;
    atualizarEstoque();
    return numeroTransacao;
  }