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

// Captura o evento de submit do formulario para obter os valores
form.onsubmit = (e) => {
    e.preventDefault();

    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        // Pega o valor da categoria selecionado, no caso, o texto dele.
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }

    // Chama a funcao que ira adicionar o item na lista
    expenseAdd(newExpense)
}

function expenseAdd(newExpense) {
    try {
        
    } catch (error) {
        alert("Nao foi possivel atualizar a lsita de despesas")
        console.log(error)
    }
}