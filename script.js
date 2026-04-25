const resultado = document.querySelector(".resultado");
const botoes = document.querySelectorAll("button");

let valorAtual = "";
let operador = "";
let valorAnterior = "";

// Atualiza tela
function atualizarDisplay() {
    resultado.innerText = valorAtual || "0";
}

// Clique nos botões
botoes.forEach(botao => {
    botao.addEventListener("click", () => {
        const valor = botao.innerText;

        // NÚMEROS
        if (!isNaN(valor) || valor === ",") {
            if (valor === "," && valorAtual.includes(".")) return;
            valorAtual += valor === "," ? "." : valor;
        }

        // OPERADORES
        else if (["+", "-", "x", "÷"].includes(valor)) {
            if (valorAtual === "") return;
            operador = valor;
            valorAnterior = valorAtual;
            valorAtual = "";
        }

        // IGUAL
        else if (valor === "=") {
            if (!valorAnterior || !valorAtual) return;

            let num1 = parseFloat(valorAnterior);
            let num2 = parseFloat(valorAtual);

            if (operador === "+") valorAtual = num1 + num2;
            if (operador === "-") valorAtual = num1 - num2;
            if (operador === "x") valorAtual = num1 * num2;
            if (operador === "÷") valorAtual = num2 !== 0 ? num1 / num2 : "Erro";

            operador = "";
            valorAnterior = "";
        }

        // LIMPAR
        else if (valor === "C") {
            valorAtual = "";
            valorAnterior = "";
            operador = "";
        }

        // MAIS/MENOS
        else if (valor === "±") {
            valorAtual = valorAtual ? (parseFloat(valorAtual) * -1).toString() : "";
        }

        // PORCENTAGEM
        else if (valor === "%") {
            valorAtual = valorAtual ? (parseFloat(valorAtual) / 100).toString() : "";
        }

        atualizarDisplay();
    });
});
