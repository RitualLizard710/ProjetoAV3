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
            Gerenciamento de alunos cadastrados.
        </p>

        <div class="card-filtros">

            <div class="campo-busca">
                <i class="fa-solid fa-magnifying-glass"></i>

                <input
                    type="text"
                    placeholder="Buscar aluno">
            </div>

            <div></div>

            <button
                class="botao-azul"
                onclick="abrirCadastroAluno()">

                Cadastrar Aluno

            </button>

        </div>

        <div class="card-tabela">

            <table>

                <thead>

                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Nível</th>
                        <th>Ações</th>
                    </tr>

                </thead>

                <tbody>

                    <tr>
                        <td>João Silva</td>
                        <td>joao@email.com</td>
                        <td>(71)99999-1111</td>

                        <td>
                            <span class="etiqueta basico">
                                Básico
                            </span>
                        </td>

                        <td>

                            <div class="acoes-tabela">

                                <button class="botao-icone editar">
                                    <i class="fa-solid fa-pen"></i>
                                </button>

                                <button class="botao-icone excluir">
                                    <i class="fa-solid fa-trash"></i>
                                </button>

                            </div>

                        </td>

                    </tr>

                    <tr>
                        <td>Maria Souza</td>
                        <td>maria@email.com</td>
                        <td>(71)99999-2222</td>

                        <td>
                            <span class="etiqueta intermediario">
                                Intermediário
                            </span>
                        </td>

                        <td>

                            <div class="acoes-tabela">

                                <button class="botao-icone editar">
                                    <i class="fa-solid fa-pen"></i>
                                </button>

                                <button class="botao-icone excluir">
                                    <i class="fa-solid fa-trash"></i>
                                </button>

                            </div>

                        </td>

                    </tr>

                </tbody>

            </table>

        </div>

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

function abrirCadastroAluno() {

    document.getElementById("conteudo").innerHTML = `

        <h1>Cadastrar Aluno</h1>

        <p class="subtitulo">
            Preencha os dados do aluno.
        </p>

        <div class="card-formulario">

            <div class="grade-formulario">

                <div>

                    <label>
                        Nome Completo
                        <span class="obrigatorio">*</span>
                    </label>

                    <input
                        type="text"
                        id="nomeAluno">

                </div>

                <div>

                    <label>
                        Email
                        <span class="obrigatorio">*</span>
                    </label>

                    <input
                        type="email"
                        id="emailAluno">

                </div>

                <div>

                    <label>
                        Telefone
                    </label>

                    <input
                        type="text"
                        id="telefoneAluno">

                </div>

                <div>

                    <label>
                        Nível
                    </label>

                    <select id="nivelAluno">

                        <option>
                            Básico
                        </option>

                        <option>
                            Intermediário
                        </option>

                        <option>
                            Avançado
                        </option>

                    </select>

                </div>

                <div class="linha-inteira">

                    <label>
                        Observações
                    </label>

                    <textarea
                        id="observacoesAluno"></textarea>

                </div>

            </div>

            <div class="acoes-formulario">

                <button
                    class="botao-cinza"
                    onclick="mostrarAlunos()">

                    Cancelar

                </button>

                <button
                    class="botao-azul"
                    onclick="salvarAluno()">

                    Salvar

                </button>

            </div>

        </div>

    `;
}
