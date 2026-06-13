function entrar() {

    document
        .getElementById("telaLogin")
        .classList.add("oculto");

    document
        .getElementById("aplicacao")
        .classList.remove("oculto");

}

function abrirRegistro() {

    document
        .getElementById("telaLogin")
        .classList.add("oculto");

    document
        .getElementById("telaRegistro")
        .classList.remove("oculto");

}

function voltarLogin() {

    document
        .getElementById("telaRegistro")
        .classList.add("oculto");

    document
        .getElementById("telaLogin")
        .classList.remove("oculto");

}
