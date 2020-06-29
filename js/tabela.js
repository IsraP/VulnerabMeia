window.onload = () => {
    var tabela = document.getElementById("tabela");
    var começo = tabela.innerHTML;
    pesquisa.oninput = () => {
        let itens = document.getElementsByClassName("item");
        let pesquisa = document.getElementById("pesquisa").value;
        let newItens = "";
        let oldTable = '';
        
        if (pesquisa == ""){
            console.log(começo)
            tabela.innerHTML = começo;
            }

        if (oldTable == "") {
            for (i = 0; i < itens.length; i++) {
                if (itens[i].innerHTML.includes(pesquisa)) {
                    newItens += `<tr class="item jtable-data-row jtable-row-even">
                    ${itens[i].innerHTML}
                    </tr>`;
                }
            }
            oldTable = tabela;
            tabela.innerHTML = "";
            tabela.innerHTML = newItens;
        }

        else {
        
            for (i = 0; i < itens.length; i++) {
                if (itens[i].innerHTML.includes(pesquisa)) {
                    newItens += `<tr class="item jtable-data-row jtable-row-even">
                    ${itens[i].innerHTML}
                    </tr>`;
                }
            }
            tabela.innerHTML = "";
            tabela.innerHTML = newItens;
            }
            
        
    }
}