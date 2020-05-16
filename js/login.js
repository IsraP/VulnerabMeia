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
                        dados = {
                            nome: username.value,
                            email: email.value,
                            telefone: phone.value,
                            senha: password.value
                        }
                        objDados.dados.push(dados)
        
                        localStorage.setItem('db', JSON.stringify(objDados))
                        location.href = "https://israp.github.io/VulnerabMeia/";
                    }
 
                }

                
            }

            login = (evento) => {
                console.log("iniciando login...")
                let objData = lerDados()
                let flagAlert = 0;

                let email = loginemail.value;
                let pass = loginPassword.value;

                for (i = 0; i < objData.dados.length; i++) {
                    if (objData.dados[i].email == email && objData.dados[i].senha == pass) {
                        flagAlert = 1;
                        location.href = "https://israp.github.io/VulnerabMeia/";
                        
                    }
                    else
                        console.log("Senha errada");
                }
                    if(flagAlert == 0)
                        document.getElementById("alertasenha").style = `display: block;`
                        


                
                console.log("terminando login...")
                evento.preventDefault()
                
            }
        }

        Botoes: {
            document.getElementById("envio").addEventListener("click", login);
            document.getElementById("cadastro").addEventListener("click", adicionarDados);
        }
    }
}