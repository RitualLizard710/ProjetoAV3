// ============================================================
// ESTADO GLOBAL — dados persistidos no localStorage
// ============================================================

let usuarios    = JSON.parse(localStorage.getItem("usuarios"))    || [];
let alunos      = JSON.parse(localStorage.getItem("alunos"))      || [];
let cursos      = JSON.parse(localStorage.getItem("cursos"))      || [];
let matriculas  = JSON.parse(localStorage.getItem("matriculas"))  || [];
let atendimentos = JSON.parse(localStorage.getItem("atendimentos")) || [];

// ============================================================
// HELPERS
// ============================================================

function salvarLocal(chave, dado) {
    localStorage.setItem(chave, JSON.stringify(dado));
}

function obterValor(id) {
    return document.getElementById(id).value;
}

function renderizarConteudo(html) {
    document.getElementById("conteudo").innerHTML = html;
}

function classNivel(nivel) {
    const mapa = { "Intermediário": "intermediario", "Avançado": "avancado" };
    return mapa[nivel] || "basico";
}

function botoesAcao(onEditar, onExcluir) {
    return `
        <div class="acoes-tabela">
            <button class="botao-icone editar" onclick="${onEditar}">
                <i class="fa-solid fa-pen"></i>
            </button>
            <button class="botao-icone excluir" onclick="${onExcluir}">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `;
}

// ============================================================
// AUTENTICAÇÃO
// ============================================================

function entrar() {
    const email = obterValor("emailLogin");
    const senha = obterValor("senhaLogin");

    const usuario = usuarios.find(u => u.email === email && u.senha === senha);

    if (!usuario) {
        alert("Email ou senha inválidos.");
        return;
    }

    document.getElementById("nomeUsuarioTopo").textContent = usuario.nome;
    document.getElementById("telaLogin").classList.add("oculto");
    document.getElementById("aplicacao").classList.remove("oculto");

    carregarDashboard();
}

function registrar() {
    const nome  = obterValor("nomeCadastro");
    const email = obterValor("emailCadastro");
    const senha = obterValor("senhaCadastro");

    if (!nome || !email || !senha) {
        alert("Preencha todos os campos.");
        return;
    }

    if (usuarios.find(u => u.email === email)) {
        alert("Este email já está cadastrado.");
        return;
    }

    usuarios.push({ id: Date.now(), nome, email, senha });
    salvarLocal("usuarios", usuarios);

    alert("Conta criada com sucesso!");
    voltarLogin();
}

function abrirRegistro() {
    document.getElementById("telaLogin").classList.add("oculto");
    document.getElementById("telaRegistro").classList.remove("oculto");
}

function voltarLogin() {
    document.getElementById("telaRegistro").classList.add("oculto");
    document.getElementById("telaLogin").classList.remove("oculto");
}

// ============================================================
// MENU / NAVEGAÇÃO
// ============================================================

function ativarMenu(idMenu) {
    document.querySelectorAll(".item-menu").forEach(m => m.classList.remove("ativo"));
    document.getElementById(idMenu).classList.add("ativo");
}

function mostrarInicio() {
    carregarDashboard();
}

function mostrarPerfil() {
    renderizarConteudo(`
        <h1>Perfil</h1>
        <p class="subtitulo">Configurações do usuário.</p>
    `);
}

// ============================================================
// DASHBOARD
// ============================================================

function carregarDashboard() {
    const totalAlunos       = alunos.length;
    const totalCursos       = cursos.length;
    const totalMatriculas   = matriculas.length;
    const agendados         = atendimentos.filter(a => a.status === "Agendado");

    const linhasProximos = agendados.slice(0, 5).map(a => `
        <tr>
            <td>${a.aluno}</td>
            <td>${a.data}</td>
            <td>${a.horario}</td>
        </tr>
    `).join("") || `
        <tr>
            <td colspan="3">Nenhum atendimento agendado.</td>
        </tr>
    `;

    renderizarConteudo(`
        <h1>Dashboard</h1>
        <p class="subtitulo">Visão geral do sistema.</p>

        <div class="grade-cards">
            <div class="card-info">
                <i class="fa-solid fa-user-graduate fa-2x"></i>
                <div class="numero-card">${totalAlunos}</div>
                <div class="texto-card">Total de Alunos</div>
            </div>
            <div class="card-info">
                <i class="fa-solid fa-book fa-2x"></i>
                <div class="numero-card">${totalCursos}</div>
                <div class="texto-card">Total de Cursos</div>
            </div>
            <div class="card-info">
                <i class="fa-solid fa-clipboard-list fa-2x"></i>
                <div class="numero-card">${totalMatriculas}</div>
                <div class="texto-card">Matrículas Ativas</div>
            </div>
            <div class="card-info">
                <i class="fa-solid fa-calendar-days fa-2x"></i>
                <div class="numero-card">${agendados.length}</div>
                <div class="texto-card">Atendimentos Agendados</div>
            </div>
        </div>

        <h2 class="titulo-rapido">Ações Rápidas</h2>
        <div class="grade-acoes">
            <button class="botao-azul" onclick="abrirCadastroAluno()">Cadastrar Aluno</button>
            <button class="botao-azul" onclick="abrirCadastroCurso()">Criar Curso</button>
            <button class="botao-azul" onclick="abrirMatricula()">Nova Matrícula</button>
            <button class="botao-azul" onclick="abrirAtendimento()">Agendar Atendimento</button>
        </div>

        <div class="painel">
            <div class="cabecalho-painel">Próximos Atendimentos</div>
            <table>
                <thead>
                    <tr><th>Aluno</th><th>Data</th><th>Horário</th></tr>
                </thead>
                <tbody>${linhasProximos}</tbody>
            </table>
        </div>
    `);
}

// ============================================================
// ALUNOS
// ============================================================

function mostrarAlunos() {
    const linhas = alunos.length
        ? alunos.map((aluno, i) => `
            <tr>
                <td>${aluno.nome}</td>
                <td>${aluno.email}</td>
                <td>${aluno.telefone}</td>
                <td><span class="etiqueta ${classNivel(aluno.nivel)}">${aluno.nivel}</span></td>
                <td>${botoesAcao(`editarAluno(${i})`, `excluirAluno(${i})`)}</td>
            </tr>
        `).join("")
        : `<tr><td colspan="5" class="estado-vazio">Nenhum aluno cadastrado.</td></tr>`;

    renderizarConteudo(`
        <h1>Alunos</h1>
        <p class="subtitulo">Gerenciamento de alunos cadastrados.</p>

        <div class="card-filtros">
            <div class="campo-busca">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" id="buscaAluno" placeholder="Buscar aluno" onkeyup="filtrarAlunos()">
            </div>
            <select id="filtroNivelAluno" onchange="filtrarAlunos()">
                <option value="Todos">Todos os níveis</option>
                <option value="Básico">Básico</option>
                <option value="Intermediário">Intermediário</option>
                <option value="Avançado">Avançado</option>
            </select>
            <button class="botao-azul" onclick="abrirCadastroAluno()">Cadastrar Aluno</button>
        </div>

        <div class="card-tabela">
            <table>
                <thead>
                    <tr><th>Nome</th><th>Email</th><th>Telefone</th><th>Nível</th><th>Ações</th></tr>
                </thead>
                <tbody>${linhas}</tbody>
            </table>
        </div>
    `);
}

function abrirCadastroAluno() {
    renderizarConteudo(`
        <h1>Cadastrar Aluno</h1>
        <p class="subtitulo">Preencha os dados do aluno.</p>

        <div class="card-formulario">
            <div class="grade-formulario">
                <div>
                    <label>Nome Completo <span class="obrigatorio">*</span></label>
                    <input type="text" id="nomeAluno">
                </div>
                <div>
                    <label>Email <span class="obrigatorio">*</span></label>
                    <input type="email" id="emailAluno">
                </div>
                <div>
                    <label>Telefone</label>
                    <input type="text" id="telefoneAluno">
                </div>
                <div>
                    <label>Nível</label>
                    <select id="nivelAluno">
                        <option>Básico</option>
                        <option>Intermediário</option>
                        <option>Avançado</option>
                    </select>
                </div>
                <div class="linha-inteira">
                    <label>Observações</label>
                    <textarea id="observacoesAluno"></textarea>
                </div>
            </div>
            <div class="acoes-formulario">
                <button class="botao-cinza" onclick="mostrarAlunos()">Cancelar</button>
                <button class="botao-azul"  onclick="salvarAluno()">Salvar</button>
            </div>
        </div>
    `);
}

function salvarAluno() {
    const nome     = obterValor("nomeAluno");
    const email    = obterValor("emailAluno");
    const telefone = obterValor("telefoneAluno");
    const nivel    = obterValor("nivelAluno");
    const observacoes = obterValor("observacoesAluno");

    if (!nome || !email) {
        alert("Nome e Email são obrigatórios.");
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Digite um email válido.");
        return;
    }

    if (telefone && !/^\d{2}\s\d{9}$/.test(telefone)) {
        alert("Telefone deve estar no formato: 71 999999999");
        return;
    }

    alunos.push({ id: Date.now(), nome, email, telefone, nivel, observacoes });
    salvarLocal("alunos", alunos);
    mostrarAlunos();
}

function editarAluno(indice) {
    const aluno = alunos[indice];

    renderizarConteudo(`
        <h1>Editar Aluno</h1>
        <p class="subtitulo">Atualize os dados do aluno.</p>

        <div class="card-formulario">
            <div class="grade-formulario">
                <div>
                    <label>Nome Completo *</label>
                    <input type="text" id="nomeAluno" value="${aluno.nome}">
                </div>
                <div>
                    <label>Email *</label>
                    <input type="email" id="emailAluno" value="${aluno.email}">
                </div>
                <div>
                    <label>Telefone</label>
                    <input type="text" id="telefoneAluno" value="${aluno.telefone}">
                </div>
                <div>
                    <label>Nível</label>
                    <select id="nivelAluno">
                        <option ${aluno.nivel === "Básico"        ? "selected" : ""}>Básico</option>
                        <option ${aluno.nivel === "Intermediário" ? "selected" : ""}>Intermediário</option>
                        <option ${aluno.nivel === "Avançado"      ? "selected" : ""}>Avançado</option>
                    </select>
                </div>
                <div class="linha-inteira">
                    <label>Observações</label>
                    <textarea id="observacoesAluno">${aluno.observacoes}</textarea>
                </div>
            </div>
            <div class="acoes-formulario">
                <button class="botao-cinza" onclick="mostrarAlunos()">Cancelar</button>
                <button class="botao-azul"  onclick="salvarEdicaoAluno(${indice})">Salvar Alterações</button>
            </div>
        </div>
    `);
}

function salvarEdicaoAluno(indice) {
    alunos[indice].nome        = obterValor("nomeAluno");
    alunos[indice].email       = obterValor("emailAluno");
    alunos[indice].telefone    = obterValor("telefoneAluno");
    alunos[indice].nivel       = obterValor("nivelAluno");
    alunos[indice].observacoes = obterValor("observacoesAluno");

    salvarLocal("alunos", alunos);
    mostrarAlunos();
}

function excluirAluno(indice) {
    if (!confirm("Deseja excluir este aluno?")) return;

    alunos.splice(indice, 1);
    salvarLocal("alunos", alunos);
    mostrarAlunos();
}

function filtrarAlunos() {
    const texto  = obterValor("buscaAluno").toLowerCase();
    const nivel  = obterValor("filtroNivelAluno");

    document.querySelectorAll("tbody tr").forEach(linha => {
        const passaBusca = linha.textContent.toLowerCase().includes(texto);
        const nivelLinha = linha.children[3]?.textContent.trim();
        const passaNivel = nivel === "Todos" || nivelLinha === nivel;
        linha.style.display = passaBusca && passaNivel ? "" : "none";
    });
}

// ============================================================
// CURSOS
// ============================================================

function mostrarCursos() {
    const linhas = cursos.length
        ? cursos.map((curso, i) => {
            const lotado = curso.vagasOcupadas >= curso.vagasTotais;
            const status = lotado ? "Lotado" : "Disponível";
            const classe = lotado ? "lotado" : "disponivel";
            return `
                <tr>
                    <td>${curso.nome}</td>
                    <td>${curso.nivel}</td>
                    <td>${curso.vagasTotais}</td>
                    <td>${curso.vagasOcupadas}</td>
                    <td><span class="etiqueta ${classe}">${status}</span></td>
                    <td>${botoesAcao(`editarCurso(${i})`, `excluirCurso(${i})`)}</td>
                </tr>
            `;
        }).join("")
        : `<tr><td colspan="6" class="estado-vazio">Nenhum curso cadastrado.</td></tr>`;

    renderizarConteudo(`
        <h1>Cursos</h1>
        <p class="subtitulo">Gerenciamento de cursos.</p>

        <div class="card-filtros">
            <div class="campo-busca">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" id="buscaCurso" placeholder="Buscar curso" onkeyup="filtrarCursos()">
            </div>
            <select id="filtroStatusCurso" onchange="filtrarCursos()">
                <option value="Todos">Todos</option>
                <option value="Disponível">Disponível</option>
                <option value="Lotado">Lotado</option>
            </select>
            <button class="botao-azul" onclick="abrirCadastroCurso()">Cadastrar Curso</button>
        </div>

        <div class="card-tabela">
            <table>
                <thead>
                    <tr><th>Curso</th><th>Nível</th><th>Vagas</th><th>Ocupadas</th><th>Status</th><th>Ações</th></tr>
                </thead>
                <tbody>${linhas}</tbody>
            </table>
        </div>
    `);
}

function abrirCadastroCurso() {
    renderizarConteudo(`
        <h1>Cadastrar Curso</h1>
        <p class="subtitulo">Cadastro de novo curso.</p>

        <div class="card-formulario">
            <div class="grade-formulario">
                <div>
                    <label>Nome do Curso *</label>
                    <input type="text" id="nomeCurso">
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
                    <input type="number" id="vagasCurso">
                </div>
                <div>
                    <label>Carga Horária</label>
                    <input type="text" id="cargaCurso">
                </div>
                <div class="linha-inteira">
                    <label>Descrição</label>
                    <textarea id="descricaoCurso"></textarea>
                </div>
            </div>
            <div class="acoes-formulario">
                <button class="botao-cinza" onclick="mostrarCursos()">Cancelar</button>
                <button class="botao-azul"  onclick="salvarCurso()">Salvar</button>
            </div>
        </div>
    `);
}

function salvarCurso() {
    const nome  = obterValor("nomeCurso");
    const nivel = obterValor("nivelCurso");
    const vagas = parseInt(obterValor("vagasCurso"));
    const carga = obterValor("cargaCurso");
    const descricao = obterValor("descricaoCurso");

    if (!nome || isNaN(vagas) || vagas <= 0) {
        alert("Preencha os campos obrigatórios. A quantidade de vagas deve ser um número inteiro positivo.");
        return;
    }

    cursos.push({ id: Date.now(), nome, nivel, vagasTotais: vagas, vagasOcupadas: 0, carga, descricao });
    salvarLocal("cursos", cursos);
    mostrarCursos();
}

function editarCurso(indice) {
    const curso = cursos[indice];

    renderizarConteudo(`
        <h1>Editar Curso</h1>
        <p class="subtitulo">Atualize os dados do curso.</p>

        <div class="card-formulario">
            <div class="grade-formulario">
                <div>
                    <label>Nome do Curso *</label>
                    <input type="text" id="nomeCurso" value="${curso.nome}">
                </div>
                <div>
                    <label>Nível *</label>
                    <select id="nivelCurso">
                        <option ${curso.nivel === "Básico"        ? "selected" : ""}>Básico</option>
                        <option ${curso.nivel === "Intermediário" ? "selected" : ""}>Intermediário</option>
                        <option ${curso.nivel === "Avançado"      ? "selected" : ""}>Avançado</option>
                    </select>
                </div>
                <div>
                    <label>Quantidade de vagas *</label>
                    <input type="number" id="vagasCurso" value="${curso.vagasTotais}">
                </div>
                <div>
                    <label>Carga Horária</label>
                    <input type="text" id="cargaCurso" value="${curso.carga}">
                </div>
                <div class="linha-inteira">
                    <label>Descrição</label>
                    <textarea id="descricaoCurso">${curso.descricao}</textarea>
                </div>
            </div>
            <div class="acoes-formulario">
                <button class="botao-cinza" onclick="mostrarCursos()">Cancelar</button>
                <button class="botao-azul"  onclick="salvarEdicaoCurso(${indice})">Salvar Alterações</button>
            </div>
        </div>
    `);
}

function salvarEdicaoCurso(indice) {
    const vagas = parseInt(obterValor("vagasCurso"));

    if (isNaN(vagas) || vagas <= 0) {
        alert("A quantidade de vagas deve ser maior que zero.");
        return;
    }

    if (vagas < cursos[indice].vagasOcupadas) {
        alert("As vagas totais não podem ser menores que as vagas ocupadas.");
        return;
    }

    cursos[indice].nome    = obterValor("nomeCurso");
    cursos[indice].nivel   = obterValor("nivelCurso");
    cursos[indice].vagasTotais = vagas;
    cursos[indice].carga   = obterValor("cargaCurso");
    cursos[indice].descricao = obterValor("descricaoCurso");

    salvarLocal("cursos", cursos);
    mostrarCursos();
}

function excluirCurso(indice) {
    if (!confirm("Excluir curso?")) return;

    cursos.splice(indice, 1);
    salvarLocal("cursos", cursos);
    mostrarCursos();
}

function filtrarCursos() {
    const texto  = obterValor("buscaCurso").toLowerCase();
    const status = obterValor("filtroStatusCurso");

    document.querySelectorAll("tbody tr").forEach(linha => {
        const passaBusca  = linha.textContent.toLowerCase().includes(texto);
        const statusLinha = linha.children[4]?.textContent.trim();
        const passaStatus = status === "Todos" || statusLinha === status;
        linha.style.display = passaBusca && passaStatus ? "" : "none";
    });
}

// ============================================================
// MATRÍCULAS
// ============================================================

function mostrarMatriculas() {
    const linhas = matriculas.length
        ? matriculas.map((m, i) => `
            <tr>
                <td>${m.aluno}</td>
                <td>${m.curso}</td>
                <td>${m.data}</td>
                <td><span class="etiqueta disponivel">Ativa</span></td>
                <td>${botoesAcao(`editarMatricula(${i})`, `excluirMatricula(${i})`)}</td>
            </tr>
        `).join("")
        : `<tr><td colspan="5" class="estado-vazio">Nenhuma matrícula cadastrada.</td></tr>`;

    renderizarConteudo(`
        <h1>Matrículas</h1>
        <p class="subtitulo">Gerenciamento de matrículas.</p>

        <div class="card-filtros">
            <div class="campo-busca">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" id="buscaMatricula" placeholder="Buscar aluno" onkeyup="filtrarMatriculas()">
            </div>
            <div></div>
            <button class="botao-azul" onclick="abrirMatricula()">Nova Matrícula</button>
        </div>

        <div class="card-tabela">
            <table>
                <thead>
                    <tr><th>Aluno</th><th>Curso</th><th>Data</th><th>Status</th><th>Ações</th></tr>
                </thead>
                <tbody>${linhas}</tbody>
            </table>
        </div>
    `);
}

function abrirMatricula() {
    if (!alunos.length) { alert("Cadastre pelo menos um aluno."); return; }
    if (!cursos.length) { alert("Cadastre pelo menos um curso."); return; }

    const opcoesAlunos = alunos.map(a => `<option value="${a.nome}">`).join("");
    const opcoesCursos = cursos.map(c => `<option>${c.nome}</option>`).join("");

    renderizarConteudo(`
        <h1>Nova Matrícula</h1>
        <p class="subtitulo">Vincular aluno a um curso.</p>

        <div class="card-formulario">
            <div class="grade-formulario">
                <div>
                    <label>Aluno *</label>
                    <input list="listaAlunos" id="alunoMatricula">
                    <datalist id="listaAlunos">${opcoesAlunos}</datalist>
                </div>
                <div>
                    <label>Curso *</label>
                    <select id="cursoMatricula">${opcoesCursos}</select>
                </div>
                <div>
                    <label>Data *</label>
                    <input type="date" id="dataMatricula">
                </div>
            </div>
            <div class="acoes-formulario">
                <button class="botao-cinza" onclick="mostrarMatriculas()">Cancelar</button>
                <button class="botao-azul"  onclick="salvarMatricula()">Salvar</button>
            </div>
        </div>
    `);
}

function salvarMatricula() {
    const aluno     = obterValor("alunoMatricula");
    const cursoNome = obterValor("cursoMatricula");
    const data      = obterValor("dataMatricula");
    const curso     = cursos.find(c => c.nome === cursoNome);

    if (curso.vagasOcupadas >= curso.vagasTotais) {
        alert("Curso lotado.");
        return;
    }

    curso.vagasOcupadas++;
    matriculas.push({ id: Date.now(), aluno, curso: cursoNome, data });

    salvarLocal("cursos", cursos);
    salvarLocal("matriculas", matriculas);
    mostrarMatriculas();
}

function editarMatricula(indice) {
    const matricula = matriculas[indice];
    const opcoesAlunos = alunos.map(a => `<option ${a.nome === matricula.aluno ? "selected" : ""}>${a.nome}</option>`).join("");
    const opcoesCursos = cursos.map(c => `<option ${c.nome === matricula.curso ? "selected" : ""}>${c.nome}</option>`).join("");

    renderizarConteudo(`
        <h1>Editar Matrícula</h1>
        <p class="subtitulo">Atualize os dados da matrícula.</p>

        <div class="card-formulario">
            <div class="grade-formulario">
                <div>
                    <label>Aluno</label>
                    <input list="listaAlunosEditar" id="alunoMatricula" value="${matricula.aluno}">
                    <datalist id="listaAlunosEditar">${opcoesAlunos}</datalist>
                </div>
                <div>
                    <label>Curso</label>
                    <select id="cursoMatricula">${opcoesCursos}</select>
                </div>
                <div>
                    <label>Data</label>
                    <input type="date" id="dataMatricula" value="${matricula.data}">
                </div>
            </div>
            <div class="acoes-formulario">
                <button class="botao-cinza" onclick="mostrarMatriculas()">Cancelar</button>
                <button class="botao-azul"  onclick="salvarEdicaoMatricula(${indice})">Salvar Alterações</button>
            </div>
        </div>
    `);
}

function salvarEdicaoMatricula(indice) {
    const matricula    = matriculas[indice];
    const cursoAntigo  = cursos.find(c => c.nome === matricula.curso);
    const novoCursoNome = obterValor("cursoMatricula");
    const novoCurso    = cursos.find(c => c.nome === novoCursoNome);

    if (cursoAntigo.nome !== novoCurso.nome) {
        if (novoCurso.vagasOcupadas >= novoCurso.vagasTotais) {
            alert("O novo curso está lotado.");
            return;
        }
        cursoAntigo.vagasOcupadas--;
        novoCurso.vagasOcupadas++;
    }

    matricula.aluno = obterValor("alunoMatricula");
    matricula.curso = novoCursoNome;
    matricula.data  = obterValor("dataMatricula");

    salvarLocal("matriculas", matriculas);
    salvarLocal("cursos", cursos);
    mostrarMatriculas();
}

function excluirMatricula(indice) {
    if (!confirm("Deseja cancelar esta matrícula?")) return;

    const curso = cursos.find(c => c.nome === matriculas[indice].curso);
    if (curso && curso.vagasOcupadas > 0) curso.vagasOcupadas--;

    matriculas.splice(indice, 1);
    salvarLocal("matriculas", matriculas);
    salvarLocal("cursos", cursos);
    mostrarMatriculas();
}

function filtrarMatriculas() {
    const texto = obterValor("buscaMatricula").toLowerCase();
    document.querySelectorAll("tbody tr").forEach(linha => {
        linha.style.display = linha.textContent.toLowerCase().includes(texto) ? "" : "none";
    });
}

// ============================================================
// ATENDIMENTOS
// ============================================================

function mostrarAtendimentos() {
    const linhas = atendimentos.length
        ? atendimentos.map((a, i) => `
            <tr>
                <td>${a.aluno}</td>
                <td>${a.data}</td>
                <td>${a.horario}</td>
                <td>${a.motivo}</td>
                <td class="status-atendimento">${a.status}</td>
                <td>${botoesAcao(`editarAtendimento(${i})`, `excluirAtendimento(${i})`)}</td>
            </tr>
        `).join("")
        : `<tr><td colspan="6" class="estado-vazio">Nenhum atendimento cadastrado.</td></tr>`;

    renderizarConteudo(`
        <h1>Atendimentos</h1>
        <p class="subtitulo">Gerenciamento de atendimentos.</p>

        <div class="card-filtros">
            <div class="campo-busca">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" id="buscaAtendimento" placeholder="Buscar aluno" onkeyup="filtrarAtendimentos()">
            </div>
            <select id="filtroStatus" onchange="filtrarAtendimentos()">
                <option value="Todos">Todos</option>
                <option value="Agendado">Agendado</option>
                <option value="Realizado">Realizado</option>
                <option value="Cancelado">Cancelado</option>
            </select>
            <button class="botao-azul" onclick="abrirAtendimento()">Agendar Atendimento</button>
        </div>

        <div class="card-tabela">
            <table>
                <thead>
                    <tr><th>Aluno</th><th>Data</th><th>Horário</th><th>Motivo</th><th>Status</th><th>Ações</th></tr>
                </thead>
                <tbody>${linhas}</tbody>
            </table>
        </div>
    `);
}

function abrirAtendimento() {
    if (!alunos.length) { alert("Cadastre um aluno primeiro."); return; }

    const opcoes = alunos.map(a => `<option value="${a.nome}">`).join("");

    renderizarConteudo(`
        <h1>Agendar Atendimento</h1>
        <p class="subtitulo">Novo atendimento.</p>

        <div class="card-formulario">
            <div class="grade-formulario">
                <div>
                    <label>Aluno *</label>
                    <input list="listaAlunosAtendimento" id="alunoAtendimento">
                    <datalist id="listaAlunosAtendimento">${opcoes}</datalist>
                </div>
                <div>
                    <label>Data *</label>
                    <input type="date" id="dataAtendimento">
                </div>
                <div>
                    <label>Horário *</label>
                    <input type="time" id="horaAtendimento">
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
                    <textarea id="motivoAtendimento"></textarea>
                </div>
            </div>
            <div class="acoes-formulario">
                <button class="botao-cinza" onclick="mostrarAtendimentos()">Cancelar</button>
                <button class="botao-azul"  onclick="salvarAtendimento()">Salvar</button>
            </div>
        </div>
    `);
}

function salvarAtendimento() {
    const aluno   = obterValor("alunoAtendimento");
    const data    = obterValor("dataAtendimento");
    const horario = obterValor("horaAtendimento");
    const motivo  = obterValor("motivoAtendimento");
    const status  = obterValor("statusAtendimento");

    atendimentos.push({ id: Date.now(), aluno, data, horario, motivo, status });
    salvarLocal("atendimentos", atendimentos);
    mostrarAtendimentos();
}

function editarAtendimento(indice) {
    const a = atendimentos[indice];
    const opcoesAlunos = alunos.map(al => `<option ${al.nome === a.aluno ? "selected" : ""}>${al.nome}</option>`).join("");

    renderizarConteudo(`
        <h1>Editar Atendimento</h1>
        <p class="subtitulo">Atualize os dados do atendimento.</p>

        <div class="card-formulario">
            <div class="grade-formulario">
                <div>
                    <label>Aluno</label>
                    <input list="listaAlunosAtendimentoEditar" id="alunoAtendimento" value="${a.aluno}">
                    <datalist id="listaAlunosAtendimentoEditar">${opcoesAlunos}</datalist>
                </div>
                <div>
                    <label>Data</label>
                    <input type="date" id="dataAtendimento" value="${a.data}">
                </div>
                <div>
                    <label>Horário</label>
                    <input type="time" id="horaAtendimento" value="${a.horario}">
                </div>
                <div>
                    <label>Status</label>
                    <select id="statusAtendimento">
                        <option ${a.status === "Agendado"  ? "selected" : ""}>Agendado</option>
                        <option ${a.status === "Realizado" ? "selected" : ""}>Realizado</option>
                        <option ${a.status === "Cancelado" ? "selected" : ""}>Cancelado</option>
                    </select>
                </div>
                <div class="linha-inteira">
                    <label>Motivo</label>
                    <textarea id="motivoAtendimento">${a.motivo}</textarea>
                </div>
            </div>
            <div class="acoes-formulario">
                <button class="botao-cinza" onclick="mostrarAtendimentos()">Cancelar</button>
                <button class="botao-azul"  onclick="salvarEdicaoAtendimento(${indice})">Salvar Alterações</button>
            </div>
        </div>
    `);
}

function salvarEdicaoAtendimento(indice) {
    atendimentos[indice].aluno   = obterValor("alunoAtendimento");
    atendimentos[indice].data    = obterValor("dataAtendimento");
    atendimentos[indice].horario = obterValor("horaAtendimento");
    atendimentos[indice].status  = obterValor("statusAtendimento");
    atendimentos[indice].motivo  = obterValor("motivoAtendimento");

    salvarLocal("atendimentos", atendimentos);
    mostrarAtendimentos();
}

function excluirAtendimento(indice) {
    if (!confirm("Deseja excluir este atendimento?")) return;

    atendimentos.splice(indice, 1);
    salvarLocal("atendimentos", atendimentos);
    mostrarAtendimentos();
}

function filtrarAtendimentos() {
    const texto  = obterValor("buscaAtendimento").toLowerCase();
    const status = obterValor("filtroStatus");

    document.querySelectorAll("tbody tr").forEach(linha => {
        const passaBusca  = linha.textContent.toLowerCase().includes(texto);
        const celula      = linha.querySelector(".status-atendimento");
        if (!celula) return;
        const passaStatus = status === "Todos" || celula.textContent.trim() === status;
        linha.style.display = passaBusca && passaStatus ? "" : "none";
    });
}
