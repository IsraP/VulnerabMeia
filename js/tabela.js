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

    pesquisa.onchange = () => {
        let ls = JSON.parse(localStorage.getItem("historico"));
        let query = pesquisa.value;
        let div = document.getElementById("historico");
        let historico = {"valores": [`${query}`]};

        if(ls == null){
            localStorage.setItem("historico", JSON.stringify(historico));
            div.innerHTML = `<p class="text-dark">Sua última pesquisa: ${query}</p>`
        }
        else{
            console.log(ls)
            ls.valores.push(query);
            localStorage.setItem("historico", JSON.stringify(ls));
            div.innerHTML = `<p class="text-dark">Sua última pesquisa: ${ls.valores[ls.valores.length-1]}</p>`
        }
        
    }
}