onload = () => {
    let pgta = new XMLHttpRequest;
    pgta.onload = mostrar;
    pgta.open("GET", "https://israp-api.herokuapp.com/perguntas");
    pgta.send();

    function mostrar() {
        let div = document.getElementById("perguntas");
        let perguntas = JSON.parse(this.responseText);
        console.log(perguntas);
        for(i = 0; i < perguntas.length; i++){
            div.innerHTML += `<div class="text-dark border-left border-right border-light">
            <h6>${perguntas[i].pergunta}</h6>
            <p>${perguntas[i].resposta}</p>
        </div>`
        }
    }
}

