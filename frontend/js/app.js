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

let atendimentos =
    JSON.parse(
        localStorage.getItem("atendimentos")
    ) || [];

function entrar() {

    document
        .getElementById("telaLogin")
        .classList.add("oculto");
    
    carregarDashboard();

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

    carregarDashboard();

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
        class="botao-icone editar"
        onclick="editarAluno(${indice})">

        <i class="fa-solid fa-pen"></i>

    </button>

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
            id="buscaAluno"
            placeholder="Buscar aluno"
            onkeyup="filtrarAlunos()">

    </div>

    <select
        id="filtroNivelAluno"
        onchange="filtrarAlunos()">

        <option value="Todos">
            Todos os níveis
        </option>

        <option value="Básico">
            Básico
        </option>

        <option value="Intermediário">
            Intermediário
        </option>

        <option value="Avançado">
            Avançado
        </option>

    </select>

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

    <div class="acoes-tabela">

        <button
            class="botao-icone editar"
            onclick="editarCurso(${indice})">

            <i class="fa-solid fa-pen"></i>

        </button>

        <button
            class="botao-icone excluir"
            onclick="excluirCurso(${indice})">

            <i class="fa-solid fa-trash"></i>

        </button>

    </div>

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
            id="buscaCurso"
            placeholder="Buscar curso"
            onkeyup="filtrarCursos()">

    </div>

    <select
        id="filtroStatusCurso"
        onchange="filtrarCursos()">

        <option value="Todos">
            Todos
        </option>

        <option value="Disponível">
            Disponível
        </option>

        <option value="Lotado">
            Lotado
        </option>

    </select>

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

    matriculas.forEach((matricula, indice) => {

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

    <td>

    <div class="acoes-tabela">

        <button
            class="botao-icone editar"
            onclick="editarMatricula(${indice})">

            <i class="fa-solid fa-pen"></i>

        </button>

        <button
            class="botao-icone excluir"
            onclick="excluirMatricula(${indice})">

            <i class="fa-solid fa-trash"></i>

        </button>

    </div>

</td>

</tr>
        `;
    });

    if(matriculas.length === 0){

        linhas = `
            <tr>

                <td colspan="5"
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

        <div class="card-filtros">

    <div class="campo-busca">

        <i class="fa-solid fa-magnifying-glass"></i>

        <input
            type="text"
            id="buscaMatricula"
            placeholder="Buscar aluno"
            onkeyup="filtrarMatriculas()">

    </div>

    <div></div>

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

function mostrarAtendimentos() {

    let linhas = "";

    atendimentos.forEach((atendimento, indice) => {

        linhas += `

            <tr>

                <td>${atendimento.aluno}</td>

                <td>${atendimento.data}</td>

                <td>${atendimento.horario}</td>

                <td>${atendimento.motivo}</td>

                <td class="status-atendimento">
                ${atendimento.status} </td>

                <td>

    <div class="acoes-tabela">

        <button
            class="botao-icone editar"
            onclick="editarAtendimento(${indice})">

            <i class="fa-solid fa-pen"></i>

        </button>

        <button
            class="botao-icone excluir"
            onclick="excluirAtendimento(${indice})">

            <i class="fa-solid fa-trash"></i>

        </button>

    </div>

</td>

            </tr>

        `;
    });

    if(atendimentos.length === 0){

        linhas = `
            <tr>

                <td colspan="6"
                    class="estado-vazio">

                    Nenhum atendimento cadastrado.

                </td>

            </tr>
        `;
    }

    document.getElementById("conteudo").innerHTML = `

        <h1>Atendimentos</h1>

        <p class="subtitulo">

            Gerenciamento de atendimentos.

        </p>

        <div class="card-filtros">

    <div class="campo-busca">

        <i class="fa-solid fa-magnifying-glass"></i>

        <input
            type="text"
            id="buscaAtendimento"
            placeholder="Buscar aluno"
            onkeyup="filtrarAtendimentos()">

    </div>

<select
        id="filtroStatus"
        onchange="filtrarAtendimentos()">

        <option value="Todos">Todos</option>
        <option value="Agendado">Agendado</option>
        <option value="Realizado">Realizado</option>
        <option value="Cancelado">Cancelado</option>

   </select>

    <button
        class="botao-azul"
        onclick="abrirAtendimento()">

        Agendar Atendimento

    </button>

</div>

        <div class="card-tabela">

            <table>

                <thead>

                    <tr>

                        <th>Aluno</th>
                        <th>Data</th>
                        <th>Horário</th>
                        <th>Motivo</th>
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

        id: Date.now(),
        
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

        id: Date.now(),
        
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

        id: Date.now(),

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

function excluirMatricula(indice) {

    if(!confirm(
        "Deseja cancelar esta matrícula?"
    )){
        return;
    }

    const matricula =
        matriculas[indice];

    const curso =
        cursos.find(
            c => c.nome === matricula.curso
        );

    if(curso && curso.vagasOcupadas > 0){

        curso.vagasOcupadas--;

    }

    matriculas.splice(indice, 1);

    localStorage.setItem(
        "matriculas",
        JSON.stringify(matriculas)
    );

    localStorage.setItem(
        "cursos",
        JSON.stringify(cursos)
    );

    mostrarMatriculas();

}

function abrirAtendimento() {

    if(alunos.length === 0){

        alert(
            "Cadastre um aluno primeiro."
        );

        return;
    }

    let opcoes = "";

    alunos.forEach((aluno) => {

        opcoes += `
            <option>
                ${aluno.nome}
            </option>
        `;
    });

    document.getElementById("conteudo").innerHTML = `

        <h1>Agendar Atendimento</h1>

        <p class="subtitulo">

            Novo atendimento.

        </p>

        <div class="card-formulario">

            <div class="grade-formulario">

                <div>

                    <label>Aluno *</label>

                    <select id="alunoAtendimento">

                        ${opcoes}

                    </select>

                </div>

                <div>

                    <label>Data *</label>

                    <input
                        type="date"
                        id="dataAtendimento">

                </div>

                <div>

                    <label>Horário *</label>

                    <input
                        type="time"
                        id="horaAtendimento">

                </div>

                <div>

                    <label>Status</label>

                    <select id="statusAtendimento">

                        <option>Agendado</option>
                        <option>Realizado</option>
                        <option>Cancelado</option>

                    </select>

                </div>

                <div class="linha-inteira">

                    <label>Motivo</label>

                    <textarea
                        id="motivoAtendimento"></textarea>

                </div>

            </div>

            <div class="acoes-formulario">

                <button
                    class="botao-cinza"
                    onclick="mostrarAtendimentos()">

                    Cancelar

                </button>

                <button
                    class="botao-azul"
                    onclick="salvarAtendimento()">

                    Salvar

                </button>

            </div>

        </div>

    `;
}

function salvarAtendimento() {

    const aluno =
        document.getElementById(
            "alunoAtendimento"
        ).value;

    const data =
        document.getElementById(
            "dataAtendimento"
        ).value;

    const horario =
        document.getElementById(
            "horaAtendimento"
        ).value;

    const motivo =
        document.getElementById(
            "motivoAtendimento"
        ).value;

    const status =
        document.getElementById(
            "statusAtendimento"
        ).value;

    atendimentos.push({

        id: Date.now(),
        
        aluno,
        data,
        horario,
        motivo,
        status

    });

    localStorage.setItem(
        "atendimentos",
        JSON.stringify(atendimentos)
    );

    mostrarAtendimentos();

}

function excluirAtendimento(indice) {

    if(confirm(
        "Deseja excluir este atendimento?"
    )) {

        atendimentos.splice(indice, 1);

        localStorage.setItem(
            "atendimentos",
            JSON.stringify(atendimentos)
        );

        mostrarAtendimentos();
    }
}

function carregarDashboard() {

    const totalAlunos =
        alunos.length;

    const totalCursos =
        cursos.length;

    const totalMatriculas =
        matriculas.length;

    const totalAtendimentos =
        atendimentos.filter(
            atendimento =>
                atendimento.status === "Agendado"
        ).length;

    let proximosAtendimentos = "";

    atendimentos
        .filter(
            atendimento =>
                atendimento.status === "Agendado"
        )
        .slice(0, 5)
        .forEach((atendimento) => {

            proximosAtendimentos += `
                <tr>

                    <td>${atendimento.aluno}</td>

                    <td>${atendimento.data}</td>

                    <td>${atendimento.horario}</td>

                </tr>
            `;

        });

    if(proximosAtendimentos === ""){

        proximosAtendimentos = `
            <tr>

                <td colspan="3">

                    Nenhum atendimento agendado.

                </td>

            </tr>
        `;
    }

    document.getElementById("conteudo").innerHTML = `

        <h1>Dashboard</h1>

        <p class="subtitulo">

            Visão geral do sistema.

        </p>

        <div class="grade-cards">

            <div class="card-info">

                <i class="fa-solid fa-user-graduate fa-2x"></i>

                <div class="numero-card">

                    ${totalAlunos}

                </div>

                <div class="texto-card">

                    Total de Alunos

                </div>

            </div>

            <div class="card-info">

                <i class="fa-solid fa-book fa-2x"></i>

                <div class="numero-card">

                    ${totalCursos}

                </div>

                <div class="texto-card">

                    Total de Cursos

                </div>

            </div>

            <div class="card-info">

                <i class="fa-solid fa-clipboard-list fa-2x"></i>

                <div class="numero-card">

                    ${totalMatriculas}

                </div>

                <div class="texto-card">

                    Matrículas Ativas

                </div>

            </div>

            <div class="card-info">

                <i class="fa-solid fa-calendar-days fa-2x"></i>

                <div class="numero-card">

                    ${totalAtendimentos}

                </div>

                <div class="texto-card">

                    Atendimentos Agendados

                </div>

            </div>

        </div>

        <h2 class="titulo-rapido">

            Ações Rápidas

        </h2>

        <div class="grade-acoes">

            <button
                class="botao-azul"
                onclick="abrirCadastroAluno()">

                Cadastrar Aluno

            </button>

            <button
                class="botao-azul"
                onclick="abrirCadastroCurso()">

                Criar Curso

            </button>

            <button
                class="botao-azul"
                onclick="abrirMatricula()">

                Nova Matrícula

            </button>

            <button
                class="botao-azul"
                onclick="abrirAtendimento()">

                Agendar Atendimento

            </button>

        </div>

        <div class="painel">

            <div class="cabecalho-painel">

                Próximos Atendimentos

            </div>

            <table>

                <thead>

                    <tr>

                        <th>Aluno</th>
                        <th>Data</th>
                        <th>Horário</th>

                    </tr>

                </thead>

                <tbody>

                    ${proximosAtendimentos}

                </tbody>

            </table>

        </div>

    `;
}

function filtrarAlunos() {

    const texto =
        document
            .getElementById("buscaAluno")
            .value
            .toLowerCase();

    const nivelSelecionado =
        document
            .getElementById("filtroNivelAluno")
            .value;

    const linhas =
        document.querySelectorAll(
            "tbody tr"
        );

    linhas.forEach((linha) => {

        const conteudo =
            linha.textContent.toLowerCase();

        const nivel =
            linha.children[3]
                ?.textContent
                .trim();

        const passaBusca =
            conteudo.includes(texto);

        const passaNivel =
            nivelSelecionado === "Todos"
            ||
            nivel === nivelSelecionado;

        linha.style.display =
            passaBusca && passaNivel
            ? ""
            : "none";

    });

}

function filtrarCursos() {

    const texto =
        document
            .getElementById("buscaCurso")
            .value
            .toLowerCase();

    const statusSelecionado =
        document
            .getElementById("filtroStatusCurso")
            .value;

    const linhas =
        document.querySelectorAll(
            "tbody tr"
        );

    linhas.forEach((linha) => {

        const conteudo =
            linha.textContent.toLowerCase();

        const status =
            linha.children[4]
                ?.textContent
                .trim();

        const passaBusca =
            conteudo.includes(texto);

        const passaStatus =
            statusSelecionado === "Todos"
            ||
            status === statusSelecionado;

        linha.style.display =
            passaBusca && passaStatus
            ? ""
            : "none";

    });

}

function filtrarMatriculas() {

    const texto =
        document
            .getElementById("buscaMatricula")
            .value
            .toLowerCase();

    const linhas =
        document.querySelectorAll(
            "tbody tr"
        );

    linhas.forEach((linha) => {

        if(
            linha.textContent
                .toLowerCase()
                .includes(texto)
        ){
            linha.style.display = "";
        }
        else{
            linha.style.display = "none";
        }

    });

}

function filtrarAtendimentos() {

    const texto =
        document
            .getElementById("buscaAtendimento")
            .value
            .toLowerCase();

    const statusSelecionado =
        document
            .getElementById("filtroStatus")
            .value;

    const linhas =
        document.querySelectorAll(
            "tbody tr"
        );

    linhas.forEach((linha) => {

        const conteudo =
            linha.textContent.toLowerCase();

        const statusCelula =
            linha.querySelector(
                ".status-atendimento"
            );

        if(!statusCelula){
            return;
        }

        const status =
            statusCelula.textContent.trim();

        const passaBusca =
            conteudo.includes(texto);

        const passaStatus =
            statusSelecionado === "Todos"
            ||
            status === statusSelecionado;

        if(
            passaBusca
            &&
            passaStatus
        ){
            linha.style.display = "";
        }
        else{
            linha.style.display = "none";
        }

    });

}

function editarAluno(indice) {

    const aluno = alunos[indice];

    document.getElementById("conteudo").innerHTML = `

        <h1>Editar Aluno</h1>

        <p class="subtitulo">
            Atualize os dados do aluno.
        </p>

        <div class="card-formulario">

            <div class="grade-formulario">

                <div>

                    <label>Nome Completo *</label>

                    <input
                        type="text"
                        id="nomeAluno"
                        value="${aluno.nome}">

                </div>

                <div>

                    <label>Email *</label>

                    <input
                        type="email"
                        id="emailAluno"
                        value="${aluno.email}">

                </div>

                <div>

                    <label>Telefone</label>

                    <input
                        type="text"
                        id="telefoneAluno"
                        value="${aluno.telefone}">

                </div>

                <div>

                    <label>Nível</label>

                    <select id="nivelAluno">

                        <option ${aluno.nivel === "Básico" ? "selected" : ""}>
                            Básico
                        </option>

                        <option ${aluno.nivel === "Intermediário" ? "selected" : ""}>
                            Intermediário
                        </option>

                        <option ${aluno.nivel === "Avançado" ? "selected" : ""}>
                            Avançado
                        </option>

                    </select>

                </div>

                <div class="linha-inteira">

                    <label>Observações</label>

                    <textarea
                        id="observacoesAluno">${aluno.observacoes}</textarea>

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
                    onclick="salvarEdicaoAluno(${indice})">

                    Salvar Alterações

                </button>

            </div>

        </div>

    `;
}

function salvarEdicaoAluno(indice) {

    alunos[indice].nome =
        document.getElementById("nomeAluno").value;

    alunos[indice].email =
        document.getElementById("emailAluno").value;

    alunos[indice].telefone =
        document.getElementById("telefoneAluno").value;

    alunos[indice].nivel =
        document.getElementById("nivelAluno").value;

    alunos[indice].observacoes =
        document.getElementById("observacoesAluno").value;

    localStorage.setItem(
        "alunos",
        JSON.stringify(alunos)
    );

    mostrarAlunos();

}

function editarCurso(indice) {

    const curso = cursos[indice];

    document.getElementById("conteudo").innerHTML = `

        <h1>Editar Curso</h1>

        <p class="subtitulo">
            Atualize os dados do curso.
        </p>

        <div class="card-formulario">

            <div class="grade-formulario">

                <div>

                    <label>Nome do Curso *</label>

                    <input
                        type="text"
                        id="nomeCurso"
                        value="${curso.nome}">

                </div>

                <div>

                    <label>Nível *</label>

                    <select id="nivelCurso">

                        <option ${curso.nivel === "Básico" ? "selected" : ""}>
                            Básico
                        </option>

                        <option ${curso.nivel === "Intermediário" ? "selected" : ""}>
                            Intermediário
                        </option>

                        <option ${curso.nivel === "Avançado" ? "selected" : ""}>
                            Avançado
                        </option>

                    </select>

                </div>

                <div>

                    <label>Quantidade de vagas *</label>

                    <input
                        type="number"
                        id="vagasCurso"
                        value="${curso.vagasTotais}">

                </div>

                <div>

                    <label>Carga Horária</label>

                    <input
                        type="text"
                        id="cargaCurso"
                        value="${curso.carga}">

                </div>

                <div class="linha-inteira">

                    <label>Descrição</label>

                    <textarea
                        id="descricaoCurso">${curso.descricao}</textarea>

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
                    onclick="salvarEdicaoCurso(${indice})">

                    Salvar Alterações

                </button>

            </div>

        </div>

    `;
}

function salvarEdicaoCurso(indice) {

    const vagas =
        parseInt(
            document.getElementById("vagasCurso").value
        );

    if(vagas < cursos[indice].vagasOcupadas){

        alert(
            "As vagas totais não podem ser menores que as vagas ocupadas."
        );

        return;
    }

    cursos[indice].nome =
        document.getElementById("nomeCurso").value;

    cursos[indice].nivel =
        document.getElementById("nivelCurso").value;

    cursos[indice].vagasTotais =
        vagas;

    cursos[indice].carga =
        document.getElementById("cargaCurso").value;

    cursos[indice].descricao =
        document.getElementById("descricaoCurso").value;

    localStorage.setItem(
        "cursos",
        JSON.stringify(cursos)
    );

    mostrarCursos();

}

function editarMatricula(indice) {

    const matricula =
        matriculas[indice];

    let opcoesAlunos = "";

    alunos.forEach((aluno) => {

        opcoesAlunos += `
            <option
                ${aluno.nome === matricula.aluno ? "selected" : ""}>

                ${aluno.nome}

            </option>
        `;
    });

    let opcoesCursos = "";

    cursos.forEach((curso) => {

        opcoesCursos += `
            <option
                ${curso.nome === matricula.curso ? "selected" : ""}>

                ${curso.nome}

            </option>
        `;
    });

    document.getElementById("conteudo").innerHTML = `

        <h1>Editar Matrícula</h1>

        <p class="subtitulo">

            Atualize os dados da matrícula.

        </p>

        <div class="card-formulario">

            <div class="grade-formulario">

                <div>

                    <label>Aluno</label>

                    <select id="alunoMatricula">

                        ${opcoesAlunos}

                    </select>

                </div>

                <div>

                    <label>Curso</label>

                    <select id="cursoMatricula">

                        ${opcoesCursos}

                    </select>

                </div>

                <div>

                    <label>Data</label>

                    <input
                        type="date"
                        id="dataMatricula"
                        value="${matricula.data}">

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
                    onclick="salvarEdicaoMatricula(${indice})">

                    Salvar Alterações

                </button>

            </div>

        </div>

    `;
}

function salvarEdicaoMatricula(indice) {

    const matricula =
        matriculas[indice];

    const cursoAntigo =
        cursos.find(
            c => c.nome === matricula.curso
        );

    const novoCursoNome =
        document.getElementById(
            "cursoMatricula"
        ).value;

    const novoCurso =
        cursos.find(
            c => c.nome === novoCursoNome
        );

    if(cursoAntigo.nome !== novoCurso.nome){

        if(
            novoCurso.vagasOcupadas >=
            novoCurso.vagasTotais
        ){

            alert(
                "O novo curso está lotado."
            );

            return;
        }

        cursoAntigo.vagasOcupadas--;

        novoCurso.vagasOcupadas++;
    }

    matricula.aluno =
        document.getElementById(
            "alunoMatricula"
        ).value;

    matricula.curso =
        novoCursoNome;

    matricula.data =
        document.getElementById(
            "dataMatricula"
        ).value;

    localStorage.setItem(
        "matriculas",
        JSON.stringify(matriculas)
    );

    localStorage.setItem(
        "cursos",
        JSON.stringify(cursos)
    );

    mostrarMatriculas();

}

function editarAtendimento(indice) {

    const atendimento =
        atendimentos[indice];

    let opcoesAlunos = "";

    alunos.forEach((aluno) => {

        opcoesAlunos += `
            <option
                ${aluno.nome === atendimento.aluno ? "selected" : ""}>

                ${aluno.nome}

            </option>
        `;

    });

    document.getElementById("conteudo").innerHTML = `

        <h1>Editar Atendimento</h1>

        <p class="subtitulo">

            Atualize os dados do atendimento.

        </p>

        <div class="card-formulario">

            <div class="grade-formulario">

                <div>

                    <label>Aluno</label>

                    <select id="alunoAtendimento">

                        ${opcoesAlunos}

                    </select>

                </div>

                <div>

                    <label>Data</label>

                    <input
                        type="date"
                        id="dataAtendimento"
                        value="${atendimento.data}">

                </div>

                <div>

                    <label>Horário</label>

                    <input
                        type="time"
                        id="horaAtendimento"
                        value="${atendimento.horario}">

                </div>

                <div>

                    <label>Status</label>

                    <select id="statusAtendimento">

                        <option ${atendimento.status === "Agendado" ? "selected" : ""}>
                            Agendado
                        </option>

                        <option ${atendimento.status === "Realizado" ? "selected" : ""}>
                            Realizado
                        </option>

                        <option ${atendimento.status === "Cancelado" ? "selected" : ""}>
                            Cancelado
                        </option>

                    </select>

                </div>

                <div class="linha-inteira">

                    <label>Motivo</label>

                    <textarea
                        id="motivoAtendimento">${atendimento.motivo}</textarea>

                </div>

            </div>

            <div class="acoes-formulario">

                <button
                    class="botao-cinza"
                    onclick="mostrarAtendimentos()">

                    Cancelar

                </button>

                <button
                    class="botao-azul"
                    onclick="salvarEdicaoAtendimento(${indice})">

                    Salvar Alterações

                </button>

            </div>

        </div>

    `;
}

function salvarEdicaoAtendimento(indice) {

    atendimentos[indice].aluno =
        document.getElementById(
            "alunoAtendimento"
        ).value;

    atendimentos[indice].data =
        document.getElementById(
            "dataAtendimento"
        ).value;

    atendimentos[indice].horario =
        document.getElementById(
            "horaAtendimento"
        ).value;

    atendimentos[indice].status =
        document.getElementById(
            "statusAtendimento"
        ).value;

    atendimentos[indice].motivo =
        document.getElementById(
            "motivoAtendimento"
        ).value;

    localStorage.setItem(
        "atendimentos",
        JSON.stringify(atendimentos)
    );

    mostrarAtendimentos();

}
