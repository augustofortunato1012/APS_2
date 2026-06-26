var titulo = document.querySelector("h1");
titulo.textContent = "Aparecida Nutricionista";

var pacientes = document.querySelectorAll(".paciente");
for (var i = 0; i < pacientes.length; i++) {
    var paciente = pacientes[i];

    var tdPeso = paciente.querySelector(".info-peso");
    var peso = tdPeso.textContent;

    var tdAltura = paciente.querySelector(".info-altura");
    var altura = tdAltura.textContent;

    var tdImc = paciente.querySelector(".info-imc");

    var pesoEhValido = validaPeso(peso);
    var alturaEhValida = validaAltura(altura);
    var pacienteInvalido = false;

    if (!pesoEhValido) {
        pacienteInvalido = true;
        tdPeso.textContent = "Peso inválido!";
    }

    if (!alturaEhValida) {
        pacienteInvalido = true;
        tdAltura.textContent = "Altura inválida!";
    }

    if (pacienteInvalido) {
        paciente.classList.add("paciente-invalido");
    }

    if (pesoEhValido && alturaEhValida) {
        tdImc.textContent = calculaImc(peso, altura);
    } else {
        tdImc.textContent = "-";
    }
}

function calculaImc(peso, altura) {
    var imc = peso / Math.pow(altura, 2);
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
