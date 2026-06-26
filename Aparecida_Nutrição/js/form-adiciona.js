var botaoAdicionar = document.querySelector("#adicionar-paciente");

botaoAdicionar.addEventListener("click", function(event) {
    event.preventDefault();

    var form = document.querySelector("#form-adiciona");
    var paciente = obtemPacienteForm(form);
    var erros = validaPaciente(paciente);

    var ul = document.querySelector("#msg-erro");
    ul.innerHTML = "";

    clearFieldValidity(form);

    if (erros.length > 0) {
        exibeMensagensDeErro(erros);
        highlightInvalidFields(paciente, form);
        return;
    }

    var pacienteTr = montaTr(paciente);
    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr);

    form.reset();
});

function obtemPacienteForm(form) {
    return {
        nome: form.nome.value.trim(),
        peso: form.peso.value.trim(),
        altura: form.altura.value.trim(),
        gordura: form.gordura.value.trim(),
        imc: calculaImc(form.peso.value, form.altura.value)
    };
}

function montaTr(paciente) {
    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");
    pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));
    return pacienteTr;
}

function montaTd(dado, classe) {
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);
    return td;
}

function validaPaciente(paciente) {
    var erros = [];

    if (paciente.nome.length === 0) {
        erros.push("O nome não pode ser em branco!");
    }
    if (paciente.peso.length === 0) {
        erros.push("O peso não pode ser em branco!");
    }
    if (paciente.altura.length === 0) {
        erros.push("A altura não pode ser em branco!");
    }
    if (paciente.gordura.length === 0) {
        erros.push("A gordura não pode ser em branco!");
    }
    if (paciente.peso.length > 0 && !validaPeso(paciente.peso)) {
        erros.push("Peso é inválido!");
    }
    if (paciente.altura.length > 0 && !validaAltura(paciente.altura)) {
        erros.push("Altura é inválida!");
    }

    return erros;
}

function exibeMensagensDeErro(erros) {
    var ul = document.querySelector("#msg-erro");
    erros.forEach(function(erro) {
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
}

function clearFieldValidity(form) {
    var fields = form.querySelectorAll(".campo");
    fields.forEach(function(field) {
        field.classList.remove("campo-invalido");
    });
}

function highlightInvalidFields(paciente, form) {
    if (paciente.nome.length === 0) {
        form.nome.classList.add("campo-invalido");
    }
    if (paciente.peso.length === 0 || !validaPeso(paciente.peso)) {
        form.peso.classList.add("campo-invalido");
    }
    if (paciente.altura.length === 0 || !validaAltura(paciente.altura)) {
        form.altura.classList.add("campo-invalido");
    }
    if (paciente.gordura.length === 0) {
        form.gordura.classList.add("campo-invalido");
    }
}

function calculaImc(peso, altura) {
    var pesoNum = parseFloat(peso);
    var alturaNum = parseFloat(altura);
    if (!validaPeso(pesoNum) || !validaAltura(alturaNum)) {
        return "-";
    }
    var imc = pesoNum / Math.pow(alturaNum, 2);
    return imc.toFixed(2);
}

function validaPeso(peso) {
    peso = parseFloat(peso);
    return peso > 0 && peso <= 635.0;
}

function validaAltura(altura) {
    altura = parseFloat(altura);
    return altura > 0 && altura <= 2.72;
}
 