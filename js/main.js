const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Helper functions

const showElement = (selector) => $(selector).classList.remove("hidden")
const hideElement = (selector) => $(selector).classList.add("hidden")

// SELECTORS

// filter card section
// type
const types = ["Todos", "Gastos", "Ganancias"]

for (let type of types) {
    let option = document.createElement("option");
    option.innerHTML = `${type}`;
    $("#type").appendChild(option)
}

// category
const categories = ["Todas", "Comidas", "Servicios", "Salidas", "Educación", "Transporte", "Trabajo"]

for (let category of categories) {
    let option = document.createElement("option");
    option.innerHTML = `${category}`;
    $("#category").appendChild(option)
}

// order
const order = ["Más reciente", "Menos reciente", "Mayor monto", "Menor monto", "A/Z", "Z/A"]

for (let range of order) {
    let option = document.createElement("option");
    option.innerHTML = `${range}`;
    $("#order").appendChild(option)
}

// new operation section
// type
const type = ["Gastos", "Ganancias"]

for (let type of types) {
    let option = document.createElement("option");
    option.innerHTML = `${type}`;
    $("#benefit").appendChild(option)
}

// category
const category = ["Todas", "Comidas", "Servicios", "Salidas", "Educación", "Transporte", "Trabajo"]

for (let category of categories) {
    let option = document.createElement("option");
    option.setAttribute("value", category)
    option.innerHTML = `${category}`;
    $("#categories").appendChild(option)
}

// INPUTS DATE

const date = () => {
    const inputDate = $$('input[type="date"]');
    inputDate.forEach((input) => {
        input.valueAsDate = new Date()
    })
}

date()

// FUNCTIONALITIES

// new operation section
// add btn

// $("#add-btn").addEventListener('click', () => {
//     const newCategory = $('#description').value
//     category.push(newCategory)
// })


// Operations table

const renderOperations = (operations) => {
    for (const operation of operations) {
        const { Descripción, Categoría, Fecha, Monto, Acciones } = operation 
        $("#table").innerHTML += `
            <td>${Descripción}</td>
            <td>${Categoría}</td>
            <td>${Fecha}</td>
            <td>${Monto}</td>
            <td>
                <button class="btn mr-2 text-xs text-teal-500 hover:text-zinc-600">Editar</button>
                <button class="btn text-xs text-teal-500 hover:text-zinc-600">Eliminar</button>
            </td>
        `
    }
}


// SECTIONS BTN
// add New operation btn

$("#add-operation-btn").addEventListener("click", () => {
    showElement(".form")
    hideElement("#operation-card")
    hideElement(".side-cards")
})

$("#add-btn").addEventListener("click", () => {
    showElement("#tablita")
    hideElement(".img")
    
})

// Category btn

$("#category-section").addEventListener("click", () => {
    showElement(".category")
    hideElement(".side-cards")
    hideElement("#operation-card")
})

// Reports btn

$("#reports-section").addEventListener("click", () => {
    showElement(".reports")
    hideElement(".side-cards")
    hideElement(".operation-card")
})




