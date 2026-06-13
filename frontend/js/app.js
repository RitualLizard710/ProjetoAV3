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

function mostrarInicio() {

    document.getElementById("conteudo").innerHTML = `
        <h1>Dashboard</h1>

        <p class="subtitulo">
            Visão geral do sistema.
        </p>
    `;
}

function mostrarAlunos() {

    document.getElementById("conteudo").innerHTML = `
        <h1>Alunos</h1>

        <p class="subtitulo">
            Gerenciamento de alunos.
        </p>
    `;
}

function mostrarCursos() {

    document.getElementById("conteudo").innerHTML = `
        <h1>Cursos</h1>

        <p class="subtitulo">
            Gerenciamento de cursos.
        </p>
    `;
}

function mostrarMatriculas() {

    document.getElementById("conteudo").innerHTML = `
        <h1>Matrículas</h1>

        <p class="subtitulo">
            Gerenciamento de matrículas.
        </p>
    `;
}

function mostrarAtendimentos() {

    document.getElementById("conteudo").innerHTML = `
        <h1>Atendimentos</h1>

        <p class="subtitulo">
            Gerenciamento de atendimentos.
        </p>
    `;
}

function mostrarPerfil() {

    document.getElementById("conteudo").innerHTML = `
        <h1>Perfil</h1>

        <p class="subtitulo">
            Configurações do usuário.
        </p>
    `;
}
