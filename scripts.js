// Seleciona os elementos do formulário
const form = document.querySelector("form");
const amount = document.querySelector('#amount');
const expense = document.querySelector('#expense');
const category = document.querySelector('#category');

// Captyra o evento de input para formator o valor
amount.oninput = () => {
    // Para nao aceitar caracteres nao numeros vou usar regex

    let value = amount.value.replace(/\D/g, "");

    // Transforma o valor em centavos
    value = Number(value) / 100;

    // Atualiza o valor do input
    amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value) {
    // Formata o valor no padrao BRL
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })

    return value
}

form.onsubmit = (e) => {
    e.preventDefault();
}