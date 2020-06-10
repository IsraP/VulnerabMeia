onload = () => {
    Funções: {
        function encriptarDados(dado){
            var encripted = CryptoJS.AES.encrypt(dado, 'RWwNdciA8Q').toString();
            return encripted;
        }

        function decriptarDados(dado){
            var dadoBytes  = CryptoJS.AES.decrypt(dado, 'RWwNdciA8Q');
            var dadoOriginal = dadoBytes.toString(CryptoJS.enc.Utf8);
            return dadoOriginal;
        }

        function lerDados(evento) {
            Requests: {
                evento.preventDefault();
                getData = new XMLHttpRequest;
                getData.onload = login
                getData.open("GET", "https://israp-api.herokuapp.com/dados")
                getData.send();
            }
        }

        function login() {
            var dados;
            dados = JSON.parse(this.responseText);
            console.log(dados);
            console.log("iniciando login...")
            let flagAlert = 0;

            let email = loginemail.value;
            let pass = loginPassword.value;


            for (i = 0; i < dados.length; i++) {
                if (decriptarDados(dados[i].email) == email && decriptarDados(dados[i].senha) == pass) {
                    flagAlert = 1;
                    var dadosLogado2 = {
                        "nome": loginemail.value
                    }
                    localStorage.setItem('logado', JSON.stringify(dadosLogado2));
                    location.href = "https://israp.github.io/VulnerabMeia/pages/logado.html";
                } else
                    console.log("Senha errada");
            }

            if (flagAlert == 0)
                document.getElementById("alertasenha").style = `display: block;`

            console.log("terminando login...")

            var dadosLogado = {
                "nome": username.value
            }
            return false;

        }

        function adicionarDados(evento) {
            evento.preventDefault();
            let sendData = new XMLHttpRequest;
            sendData.open("POST", "https://israp-api.herokuapp.com/dados", true);
            sendData.setRequestHeader("Content-Type", "application/json");
            

            if(password.value != passwordCon.value){
                document.getElementById("alertaconfirmar").style = `display: block`;
            }

            else{
                if(username.value == "" || email.value == "" || password.value == "" || passwordCon.value == ""){
                    let camposObrigatorios = document.getElementsByClassName("campoObrigatorio");
                    for(i = 0; i < camposObrigatorios.length; i++){
                        camposObrigatorios[i].innerHTML = `<strong>*</strong> Campo obrigatório.`
                        camposObrigatorios[i].style = `display: inline;`
                    }
                }
                else{
                    let dados = 
                    {
                        "nome": encriptarDados(username.value),
                        "email": encriptarDados(email.value),
                        "telefone": encriptarDados(phone.value),
                        "senha": encriptarDados(password.value)
                    };
                    console.log(dados)
                    sendData.send(JSON.stringify(dados));
                    sendData.onreadystatechange = function() {//Call a function when the state changes.
                        if(sendData.readyState == 4) {
                            dadosLogado = {
                                "nome": username.value
                            }
                            localStorage.setItem('logado', JSON.stringify(dadosLogado))
                            location.href = "https://israp.github.io/VulnerabMeia/pages/logado.html";
                        }
                    }
                }
            }
        }
    }

    Botoes: {
        document.getElementById("envio").addEventListener("click", lerDados);
        document.getElementById("cadastro").addEventListener("click", adicionarDados);
    }
}