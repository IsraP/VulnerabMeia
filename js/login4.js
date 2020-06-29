onload = () => {
    Funções: {
        function encriptarDados(dado, key){
            var encripted = CryptoJS.AES.encrypt(dado, key).toString();
            return encripted;
        }

        function decriptarDados(dado, key){
            var dadoBytes  = CryptoJS.AES.decrypt(dado, key);
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
                if (decriptarDados(dados[i].email, pass) == email && decriptarDados(dados[i].senha, pass) == pass) {
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
            evento.preventDefault(); // Evitar que a página redirecione antes de fazer a requisição
            let sendData = new XMLHttpRequest; // Cria a requisição para enviar os dados
            sendData.open("POST", "https://israp-api.herokuapp.com/dados", true); // Abre uma requisição POST
            sendData.setRequestHeader("Content-Type", "application/json"); // Cria um header pro CORS nao encher o saco
            

            if(password.value != passwordCon.value){
                document.getElementById("alertaconfirmar").style = `display: block`; // Mostra que as senhas não coincidem
            }

            else{
                if(username.value == "" || email.value == "" || password.value == "" || passwordCon.value == ""){
                    let camposObrigatorios = document.getElementsByClassName("campoObrigatorio");
                    for(i = 0; i < camposObrigatorios.length; i++){
                        camposObrigatorios[i].innerHTML = `<strong>*</strong> Campo obrigatório.` // Mostra os cambos obrigatorios
                        camposObrigatorios[i].style = `display: inline;`
                    }
                }
                else{
                    let dados = // Cria um objeto com os dados inseridos pelo usuário
                    {
                        "nome": encriptarDados(username.value, password.value),
                        "email": encriptarDados(email.value, password.value),
                        "telefone": encriptarDados(phone.value, password.value),
                        "senha": encriptarDados(password.value, password.value)
                    };
                    console.log(dados) // debug dos dados
                    sendData.send(JSON.stringify(dados)); // Envia os dados em formato de string para a api do json-server
                    sendData.onreadystatechange = function() { // Chama a função quando os dados chegarem lá.
                        if(sendData.readyState == 4) {
                            dadosLogado = { // Cria um objeto para salvar no localStorage o usuário que foi logado
                                "nome": username.value
                            }
                            localStorage.setItem('logado', JSON.stringify(dadosLogado)) // Salva no localStorage o usuário que foi logado
                            location.href = "https://israp.github.io/VulnerabMeia/pages/logado.html"; // Redireciona para a página de usuário logado
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