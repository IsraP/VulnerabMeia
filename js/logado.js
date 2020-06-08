Bloco_Onload: {

    LocalStorage: {
        let nomeString = localStorage.getItem('logado');
        var nome = JSON.parse(nomeString).nome;
        let texto = "";
        texto += `<h2 class="text-primaria fontelegal" id="nome"><strong>Olá ${nome}!</strong></h2>
                         <h4 class="text-primaria fontelegal"><br>Como podemos te ajudar hoje?</h4>`;
        let algumaCoisa = document.getElementsByClassName("nome");
        console.log(algumaCoisa.length)
        for(i = 0; i < 2; i++){
            algumaCoisa[i].innerHTML = texto;
        }
        
    }
}