Onload: {
    window.onload = () => {
        Funções: {




            lerDados = () => {
                let strDados = localStorage.getItem('db');
                let objDados = {}

                if (strDados) {
                    objDados = JSON.parse(strDados)
                } else {
                    objDados = {
                        dados: [{
                            nome: "admin",
                            email: "admin@admin.com",
                            telefone: "9999-9999",
                            senha: "admin"
                        }]
                    }
                }

                return objDados

            }

            adicionarDados = () => {
                let objDados = lerDados()
                console.log(username.value, email.value, phone.value, password.value);
                dados = {
                    nome: username.value,
                    email: email.value,
                    telefone: phone.value,
                    senha: password.value
                }
                objDados.dados.push(dados)

                localStorage.setItem('db', JSON.stringify(objDados))
            }

            login = () => {
                let objData = lerDados()

                for (i = 0; i < objData.dados.length; i++) {
                    if (objData.dados[i].email == loginemail.value && objData.dados[i].senha == loginPassword.value) {
                        window.location.href = "https://israp.github.io/VulnerabMeia/";
                    }
                    else
                        console.log("TA ERRADO BLZ");
                }
                return false;
            }
        }

        Botoes: {
            document.getElementById("envio").addEventListener("click", login);
            document.getElementById("cadastro").addEventListener("click", adicionarDados);
        }
    }
}