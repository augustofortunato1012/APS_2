var tabela = document.querySelector("#tabela-pacientes");

tabela.addEventListener("dblclick", function (event) {
    var linha = event.target.closest("tr");
    if (linha) {
        linha.remove();
    }
});