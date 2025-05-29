// Seleciona os elementos do formulário
const form = document.querySelector("form");
const amount = document.querySelector('#amount');
const expense = document.querySelector('#expense');
const category = document.querySelector('#category');

// Seleciona os elementos da lista
const expenseList = document.querySelector('ul');
const expensesQuantity = document.querySelector('aside header p span');

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

// Adiciona um novo item na lista
function expenseAdd(newExpense) {
    try {
        // Cria o elemento para adicionar o item na lista
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        // Cria o icone da categoria
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)

        // Cria a info da despesa
        const expenseInfo = document.createElement('div');
        expenseInfo.classList.add("expense-info")

        // Cria o nome da despesa
        const expenseName = document.createElement('strong');
        expenseName.textContent = newExpense.expense

        // Cria a categoria da despesa
        const expenseCategory = document.createElement('span');
        expenseCategory.textContent = newExpense.category_name

        // Adiciona name e category na div das informações da despesa.
        expenseInfo.append(expenseName, expenseCategory)

        // Cria o valor da despesa
        const expenseAmount = document.createElement('span');
        expenseAmount.classList.add("expense-amount");
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
            .toUpperCase()
            .replace("R$", "")}`

        // Cria o ícone de remover
        const removeIcon = document.createElement('img')
        removeIcon.classList.add('remove-icon')
        removeIcon.setAttribute('src', 'img/remove.svg')
        removeIcon.setAttribute('alt', 'remover')

        // Adiciona as informacoes no item
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

        // Adiciona o item na lista
        expenseList.append(expenseItem)

        // Atualiza os totais
        updateTotals(); 


    } catch (error) {
        alert("Nao foi possivel atualizar a lsita de despesas")
        console.log(error)
    }
}

// Atualiza os totais
function updateTotals() {
    try {
    // Recupera os itens (li) da lista (ul)
    const items = expenseList.children
    
    // Atualiza a quantidade de itens da lista
    expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`

    // Variavel para incrementar o total
    let total = 0
    
    // Percorre cada item (li) da lista (ul)
    for (let item = 0; item < items.length; item++) {
        const itemAmount = items[item].querySelector(".expense-amount")

        console.log(itemAmount)
    }


    } catch (error) {
        console.log(error)
        alert("Nao foi possivel atualizar os totais")
    }
}