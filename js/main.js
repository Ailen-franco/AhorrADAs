const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// HELPER FUNCTIONS
//Show or Hide Elements
const showElement = (selector) => $(selector).classList.remove("hidden")
const hideElement = (selector) => $(selector).classList.add("hidden")
//Random ID generator
const randomId = () => self.crypto.randomUUID()


// SELECTORS
// filter card section
// type
const types = ["Todos", "Gastos", "Ganancias"]

for (let type of types) {
    let option = document.createElement("option");
    option.innerHTML = `${type}`;
    $("#type").appendChild(option)
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
// INPUTS DATE
const date = () => {
    const inputDate = $$('input[type="date"]');
    inputDate.forEach((input) => {
        input.valueAsDate = new Date()
    })
}
date()

// SHOW/HIDE SECTION
//Show New Operation Form
$("#add-operation-btn").addEventListener("click", () => {
    showElement(".form")
    hideElement("#operation-card")
    hideElement(".aside-cards")
})
//Show operations table card
$("#add-btn").addEventListener("click", () => {
    hideElement(".form")
    showElement("#operation-card")
    hideElement("#img")
    showElement("#table")   
})
//Cancel New Operation
$("#cancel-btn").addEventListener("click", () => {
    showElement("#operation-card")
    showElement(".aside-cards")
    hideElement(".form")
})
//Show Category Section
$("#category-section").addEventListener("click", () => {
    showElement(".category")
    hideElement(".aside-cards")
    hideElement("#operation-card")
    hideElement(".form")
    hideElement(".reports")
    hideElement(".edit-category")
})
//Hide Edit Category Section
$("#cancel-btn-category").addEventListener("click", () => {
    showElement(".category")
    hideElement(".edit-category")
})
//Show Reports Section
$("#reports-section").addEventListener("click", () => {
    showElement(".reports")
    hideElement("#operation-card")
    hideElement(".aside-cards")
    hideElement(".category")
    hideElement(".form")
    hideElement(".edit-form")
})
//Show Balance Section
$("#balance-section").addEventListener("click", () => {
    showElement("#operation-card")
    showElement(".aside-cards")
    hideElement(".reports")
    hideElement(".category")
    hideElement(".form")  
})
//Show Dropdown Menu
$(".bars").addEventListener("click", () => {
    showElement("#dropdown")
    showElement(".x-mark")
    hideElement(".bars")
})
//Hide Dropdown Menu
$(".x-mark").addEventListener("click", () => {
    hideElement("#dropdown")
    hideElement(".x-mark")
    showElement(".bars")
})
//Show Balance Section with Dropdown Menu
$("#balance-dropdown").addEventListener("click", () => {
    showElement("#operation-card")
    showElement(".aside-cards")
    hideElement(".reports")
    hideElement(".category")
    hideElement(".form")  
})
//Show Category Section with Dropdown Menu
$("#category-dropdown").addEventListener("click", () => {
    showElement(".category")
    hideElement(".aside-cards")
    hideElement("#operation-card")
    hideElement(".form")
    hideElement(".reports")
})
//Show Reports Section with Dropdown Menu
$("#reports-dropdown").addEventListener("click", () => {
    showElement(".reports")
    hideElement("#operation-card")
    hideElement(".aside-cards")
    hideElement(".category")
    hideElement(".form")
    hideElement(".edit-form")
})

//Scroll the main content down when the menu is displayed
//Defino una variable para corroborar el estado del menú
let isMenuOpen = false;
// Add an event handler to the menu button
$(".bars").addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;

// Sets the top margin of the main content
if (isMenuOpen) {
    $(".main-content").style.marginTop = '85px';
} else {
    $(".main-content").style.marginTop = '0';
}
});
$(".x-mark").addEventListener('click', () => {
    // Close menu
    isMenuOpen = false;
  
// Restores the top margin of the main content
$(".main-content").style.marginTop = '0';
});



    