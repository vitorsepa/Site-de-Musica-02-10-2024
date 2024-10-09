function addUser(){
    let name = document.getElementById("name").value
    let email = document.getElementById("email").value
    let confirmEmail = document.getElementById("confirm-email").value
    let password = document.getElementById("password").value
    let confirmPassword = document.getElementById("confirm-password").value

    //recupera lista de usuarios armazenada no localstorage ou cria uma lista vazia de usuarios, caso nao haja nenhum usuario cadastrado
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || []

    //validacao email e senha
    if(email !== confirmEmail){
        document.getElementById("error").innerText = "Os emails são diferentes"
    }

    if(email !== confirmPassword){
        document.getElementById("error").innerText = "As senhas são diferentes"
    }

    //verificacao se o email ja esta cadastrado
    let usuarioExistente = usuarios.find(usuario => usuario.email === email)
    if(usuarioExistente){
        document.getElementById("error").innerText = "Usuário Já Cadastrado"
        return
    }

    //cadastrar um novo usuario que sera armazenado na lista de usuarios
    let novoUsuario = {
        id: Date.now(),
        nome: name,
        email: email,
        senha: btoa(password), //salvando a senha com criptografia
        playlists: []
    }

    //colocando objeto novoUsuario no final da lista de usuarios
    usuarios.push(novoUsuario)

    //salvar no local storage
    localStorage.setItem("usuarios", JSON.stringify(usuarios))
    document.getElementById("error").innerText = "Usuário cadastrad com sucesso"

    //depois que o usuario for cadastrado
    setTimeout(() => {
        window.location.href = "index.html"
    }, 3000)

    function backLogin(){
        window.location.href = "index.html"
    }

    //funcao login
    function login(){
        let email = document.getElementById("login-email").value
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || []
        let password = document.getElementById("login-password").value

        //encontrando o usuario e a senha no local storage
        let usuario = usuarios.find(usuario => usuario.email === email && usuario.password === btoa(password))

        //verificando se o usuario e senha estao corretos
        if(usuario){
            //armazenar que o usuario esta logado
            sessionStorage.setItem("usuarioLogado", JSON.stringify(usuario))
            
            //redirecionar para a pagina home
            window.location.href = "inicio.html"
        } else {
            document.getElementById("mensagem").innerText = "usuário ou senha incorretos"
        }
    }
}