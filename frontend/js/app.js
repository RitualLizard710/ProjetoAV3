let alunos =
    JSON.parse(
        localStorage.getItem("alunos")
    ) || [];

let cursos =
    JSON.parse(
        localStorage.getItem("cursos")
    ) || [];

let matriculas =
    JSON.parse(
        localStorage.getItem("matriculas")
    ) || [];

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

    let linhas = "";

    alunos.forEach((aluno, indice) => {

        let classeNivel = "basico";

        if(aluno.nivel === "Intermediário") {
            classeNivel = "intermediario";
        }

        if(aluno.nivel === "Avançado") {
            classeNivel = "avancado";
        }

        linhas += `
            <tr>

                <td>${aluno.nome}</td>

                <td>${aluno.email}</td>

                <td>${aluno.telefone}</td>

                <td>
                    <span class="etiqueta ${classeNivel}">
                        ${aluno.nivel}
                    </span>
                </td>

                <td>

                    <div class="acoes-tabela">

                        <button
                            class="botao-icone excluir"
                            onclick="excluirAluno(${indice})">

                            <i class="fa-solid fa-trash"></i>

                        </button>

                    </div>

                </td>

            </tr>
        `;
    });

    if(alunos.length === 0){

        linhas = `
            <tr>
                <td colspan="5"
                    class="estado-vazio">

                    Nenhum aluno cadastrado.

                </td>
            </tr>
        `;
    }

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

                    ${linhas}

                </tbody>

            </table>

        </div>
    `;
}

function mostrarCursos() {

    let linhas = "";

    cursos.forEach((curso, indice) => {

        const status =
            curso.vagasOcupadas >= curso.vagasTotais
            ? "Lotado"
            : "Disponível";

        const classe =
            status === "Lotado"
            ? "lotado"
            : "disponivel";

        linhas += `
            <tr>

                <td>${curso.nome}</td>

                <td>${curso.nivel}</td>

                <td>${curso.vagasTotais}</td>

                <td>${curso.vagasOcupadas}</td>

                <td>

                    <span class="etiqueta ${classe}">
                        ${status}
                    </span>

                </td>

                <td>

                    <button
                        class="botao-icone excluir"
                        onclick="excluirCurso(${indice})">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </td>

            </tr>
        `;
    });

    if(cursos.length === 0){

        linhas = `
            <tr>
                <td colspan="6"
                    class="estado-vazio">

                    Nenhum curso cadastrado.

                </td>
            </tr>
        `;
    }

    document.getElementById("conteudo").innerHTML = `

        <h1>Cursos</h1>

        <p class="subtitulo">
            Gerenciamento de cursos.
        </p>

        <div class="card-filtros">

            <div class="campo-busca">

                <i class="fa-solid fa-magnifying-glass"></i>

                <input
                    type="text"
                    placeholder="Buscar curso">

            </div>

            <div></div>

            <button
                class="botao-azul"
                onclick="abrirCadastroCurso()">

                Cadastrar Curso

            </button>

        </div>

        <div class="card-tabela">

            <table>

                <thead>

                    <tr>
                        <th>Curso</th>
                        <th>Nível</th>
                        <th>Vagas</th>
                        <th>Ocupadas</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>

                </thead>

                <tbody>

                    ${linhas}

                </tbody>

            </table>

        </div>
    `;
}

function mostrarMatriculas() {

    let linhas = "";

    matriculas.forEach((matricula) => {

        linhas += `

            <tr>

                <td>${matricula.aluno}</td>

                <td>${matricula.curso}</td>

                <td>${matricula.data}</td>

                <td>

                    <span class="etiqueta disponivel">
                        Ativa
                    </span>

                </td>

            </tr>

        `;
    });

    if(matriculas.length === 0){

        linhas = `
            <tr>

                <td colspan="4"
                    class="estado-vazio">

                    Nenhuma matrícula cadastrada.

                </td>

            </tr>
        `;
    }

    document.getElementById("conteudo").innerHTML = `

        <h1>Matrículas</h1>

        <p class="subtitulo">

            Gerenciamento de matrículas.

        </p>

        <div class="grade-acoes">

            <button
                class="botao-azul"
                onclick="abrirMatricula()">

                Nova Matrícula

            </button>

        </div>

        <div class="card-tabela">

            <table>

                <thead>

                    <tr>

                        <th>Aluno</th>
                        <th>Curso</th>
                        <th>Data</th>
                        <th>Status</th>

                    </tr>

                </thead>

                <tbody>

                    ${linhas}

                </tbody>

            </table>

        </div>
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

function salvarAluno() {

    const nome =
        document.getElementById("nomeAluno").value;

    const email =
        document.getElementById("emailAluno").value;

    const telefone =
        document.getElementById("telefoneAluno").value;

    const nivel =
        document.getElementById("nivelAluno").value;

    const observacoes =
        document.getElementById("observacoesAluno").value;

    if(nome === "" || email === "") {

        alert("Nome e Email são obrigatórios.");

        return;
    }

    alunos.push({
        nome,
        email,
        telefone,
        nivel,
        observacoes
    });

    localStorage.setItem(
    "alunos",
    JSON.stringify(alunos)
);

    mostrarAlunos();

}

function excluirAluno(indice) {

    if(confirm("Deseja excluir este aluno?")) {

        alunos.splice(indice, 1);

        localStorage.setItem(
    "alunos",
    JSON.stringify(alunos)
);

        mostrarAlunos();

    }

}

function abrirCadastroCurso() {

    document.getElementById("conteudo").innerHTML = `

        <h1>Cadastrar Curso</h1>

        <p class="subtitulo">
            Cadastro de novo curso.
        </p>

        <div class="card-formulario">

            <div class="grade-formulario">

                <div>

                    <label>Nome do Curso *</label>

                    <input
                        type="text"
                        id="nomeCurso">

                </div>

                <div>

                    <label>Nível *</label>

                    <select id="nivelCurso">

                        <option>Básico</option>
                        <option>Intermediário</option>
                        <option>Avançado</option>

                    </select>

                </div>

                <div>

                    <label>Quantidade de vagas *</label>

                    <input
                        type="number"
                        id="vagasCurso">

                </div>

                <div>

                    <label>Carga Horária</label>

                    <input
                        type="text"
                        id="cargaCurso">

                </div>

                <div class="linha-inteira">

                    <label>Descrição</label>

                    <textarea
                        id="descricaoCurso"></textarea>

                </div>

            </div>

            <div class="acoes-formulario">

                <button
                    class="botao-cinza"
                    onclick="mostrarCursos()">

                    Cancelar

                </button>

                <button
                    class="botao-azul"
                    onclick="salvarCurso()">

                    Salvar

                </button>

            </div>

        </div>
    `;
}

function salvarCurso() {

    const nome =
        document.getElementById("nomeCurso").value;

    const nivel =
        document.getElementById("nivelCurso").value;

    const vagas =
        parseInt(
            document.getElementById("vagasCurso").value
        );

    const carga =
        document.getElementById("cargaCurso").value;

    const descricao =
        document.getElementById("descricaoCurso").value;

    if(nome === "" || !vagas){

        alert(
            "Preencha os campos obrigatórios."
        );

        return;
    }

    cursos.push({

        nome,
        nivel,
        vagasTotais: vagas,
        vagasOcupadas: 0,
        carga,
        descricao

    });

    localStorage.setItem(
        "cursos",
        JSON.stringify(cursos)
    );

    mostrarCursos();
}

function excluirCurso(indice) {

    if(confirm("Excluir curso?")) {

        cursos.splice(indice, 1);

        localStorage.setItem(
            "cursos",
            JSON.stringify(cursos)
        );

        mostrarCursos();
    }
}

function abrirMatricula() {

    if(alunos.length === 0){

        alert(
            "Cadastre pelo menos um aluno."
        );

        return;
    }

    if(cursos.length === 0){

        alert(
            "Cadastre pelo menos um curso."
        );

        return;
    }

    let opcoesAlunos = "";

    alunos.forEach((aluno) => {

        opcoesAlunos += `
            <option>
                ${aluno.nome}
            </option>
        `;
    });

    let opcoesCursos = "";

    cursos.forEach((curso) => {

        opcoesCursos += `
            <option>
                ${curso.nome}
            </option>
        `;
    });

    document.getElementById("conteudo").innerHTML = `

        <h1>Nova Matrícula</h1>

        <p class="subtitulo">

            Vincular aluno a um curso.

        </p>

        <div class="card-formulario">

            <div class="grade-formulario">

                <div>

                    <label>Aluno *</label>

                    <select id="alunoMatricula">

                        ${opcoesAlunos}

                    </select>

                </div>

                <div>

                    <label>Curso *</label>

                    <select id="cursoMatricula">

                        ${opcoesCursos}

                    </select>

                </div>

                <div>

                    <label>Data *</label>

                    <input
                        type="date"
                        id="dataMatricula">

                </div>

            </div>

            <div class="acoes-formulario">

                <button
                    class="botao-cinza"
                    onclick="mostrarMatriculas()">

                    Cancelar

                </button>

                <button
                    class="botao-azul"
                    onclick="salvarMatricula()">

                    Salvar

                </button>

            </div>

        </div>

    `;
}

function salvarMatricula() {

    const aluno =
        document.getElementById("alunoMatricula").value;

    const cursoNome =
        document.getElementById("cursoMatricula").value;

    const data =
        document.getElementById("dataMatricula").value;

    const curso =
        cursos.find(
            c => c.nome === cursoNome
        );

    if(
        curso.vagasOcupadas >=
        curso.vagasTotais
    ){

        alert(
            "Curso lotado."
        );

        return;
    }

    curso.vagasOcupadas++;

    matriculas.push({

        aluno,
        curso: cursoNome,
        data

    });

    localStorage.setItem(
        "cursos",
        JSON.stringify(cursos)
    );

    localStorage.setItem(
        "matriculas",
        JSON.stringify(matriculas)
    );

    mostrarMatriculas();
}
