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
const type = ["Todos", "Gastos", "Ganancias"]

for (let type of types) {
    let option = document.createElement("option");
    option.innerHTML = `${type}`;
    $("#benefit").appendChild(option)
}
// edit operation section
// type
const editType = ["Todos", "Gastos", "Ganancias"]

for (let type of types) {
    let option = document.createElement("option");
    option.innerHTML = `${type}`;
    $("#edit-benefit").appendChild(option)
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
    hideElement(".edit-form")  
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

//----------------------------------------------------------
//                       CATEGORIES
//----------------------------------------------------------

//Objeto que voy a guardar en el LocalStorage
// data = {
//     //Objeto categorias
//     categories : [],
//     //Objeto operaciones
//     operations : [],
// }; 
//Envío mi objeto al LocalStorage bajo la key "data"
//localStorage.setItem("data", JSON.stringify(data));


//LocalStorage get item 
const getItems = () => {
    return JSON.parse(localStorage.getItem("data"));
};
//LocalStorage set item
// const setItem = () => {
//     return JSON.stringify(localStorage.setItem("data"));
// };

const setItem = (data) => {
    localStorage.setItem("data", JSON.stringify({ ...getItems(), ...data}));
};
// Get Categories Function 
const getCategories = () => {
    return getItems()?.categories
};

let categories = getCategories() || [
    {
        id: randomId(),
        name: "Comida",
    },
    {
        id: randomId(),
        name: "Servicios",
    },
    {
        id: randomId(),
        name: "Salidas",
    },
    {
        id: randomId(),
        name: "Educacion",
    },
    {
        id: randomId(),
        name: "Transporte",
    },
    {
        id: randomId(),
        name: "Trabajo",
    },
]
console.log(categories)

//Function to complete the selector with categories 
const completeSelector = (categories) => {
    $$("#category").forEach((select) => {
        select.innerHTML = "";
        for (let { name, id } of categories) {
            select.innerHTML += `<option value="${id}">${name}</option>`
        } 
    });
};
completeSelector(categories);

//capture the value of the filters section option 
$(".category-filter").addEventListener("change", () => {
    console.log($(".category-filter").value);
});
//capture value of category section in form
$(".category-form").addEventListener("change", () => {
    console.log($(".category-form").value);
});
//capture the value of the edit category section
$(".category-edit").addEventListener("change", () => {
    console.log($(".category-edit").value);
});

// Generate the list of categories from javascript
const categoryList = (categories) => {
    $("#category-list").innerHTML = "";
     for (const { name, id } of categories) {
         $("#category-list").innerHTML += `
         <li class="flex justify-between h-6 my-4 text-center">
             <p class="w-20 text-teal-800 bg-teal-100 rounded">${name}</p>
             <div class="mr-8">
                 <button onclick="showEditCategoryBtn('${id}')" id="${id}" class="mr-2 text-xs text-teal-500 hover:text-zinc-600 edit-category-btn">Editar</button>
                 <button onclick="deleteCategoryBtn('${id}')" id="${id}" class="text-xs text-teal-500 hover:text-zinc-600 delete-category-btn">Eliminar</button>
             </div>
         </li>`
     };
 };
 categoryList(categories)

//esta linea la utilicé para subir la variable de array de objetos "categories" dentro del array categories, del objeto "data"
  setItem({ categories: categories });

//Add Category
const addCategory = () => {
    //Create a new category
    let newCategory = {
        id: randomId(),
        name: $("#add-category").value
    };
    let currentCategories = getCategories()
    currentCategories.push(newCategory)
    categoryList(currentCategories)
    completeSelector(currentCategories)
    setItem({ categories: currentCategories})
    //Clean the input field
    $("#add-category").value = "";
    
};
$(".add-category-btn").addEventListener("click", addCategory)

//Function to filter the category  
const filterCategory = (idCategory, categories) => {
    return categories.find((category) => category.id === idCategory);
};

//Function for the "edit" button of the edit categories list
const showEditCategoryBtn = (id) => {
    $(".edit-category").classList.remove("hidden");
    $(".category").classList.add("hidden");
    //Variable que guarda el contenido de la función filterCategory y nos devuelve un elemento filtrado del array
    let editDenomination = filterCategory(id, getCategories());
    //Completa el value en el input
    $("#edit-category-input").value = editDenomination.name;
    //Evento para que agregue el nuevo value editado
    $("#edit-btn-category").addEventListener("click", () => 
    editCategory(editDenomination.id))
    console.log(editDenomination.id)
};

//Functionality for the input to take the new value of said input
const editCategory = (id) => {
    //Create a new category
    let newCategory = {
        id: id,
        name: $("#edit-category-input").value   
    };
    // Variable que guarda los últimos datos actualizados, y con el metodo map, recorre cada categoría del array
    let updatedCategories = getCategories().map((category) => 
    
    //Utilizo el operador ternario para buscar el mismo id que entra por parámetro, y guardarla en la nueva categoria 
    category.id === id ? { ...newCategory } : category
    );
    console.log(updatedCategories),
    categoryList(updatedCategories);
    completeSelector(updatedCategories);
    setItem({ categories: updatedCategories });
    $("#edit-btn-category").addEventListener("click", () => {
        hideElement(".edit-category")
        showElement(".category")
    });
};

//function for the "delete" button from the list of edit categories 
const deleteCategoryBtn = (id) => {
    let currentCategory = getCategories().filter((category) =>
    category.id !== id)
    categoryList(currentCategory)
    completeSelector(currentCategory)
    setItem({ categories: currentCategory})
};

//----------------------------------------------------------
//                       OPERATIONS
//----------------------------------------------------------
//Get Operations Function
const getOperations = () => {
    return getItems()?.operations
};


let operations = getOperations() || [
    {
    id: randomId(),
    description: $("#description").value,
    amount: $("#amount").valueAsNumber,
    type: $("#benefit").value,
    category: $("#category").value,
    date: $("#date").value,
    },
]
console.log(operations)

//esta linea la utilicé para subir la variable de array de objetos "operations" dentro del array operations, del objeto "data"
//setItem({ operations: operations });

// Operations table
const renderOperations = (operations) => {
    $("#tBody").innerHTML = ""
    for (const { id, description, category, date, amount } of operations) {
        $("#tBody").innerHTML += `
            <td class="font-semibold text-gray-600">${description}</td>
            <td class="text-teal-800 bg-teal-100 rounded">${category}</td>
            <td class="text-gray-500">${date}</td>
            <td>${amount}</td>
            <td>
                <button onclick="showEditOperationBtn('${id}')" id="${id}" class="btn mr-2 text-xs text-teal-500 hover:text-zinc-600 edit-operation-btn">Editar</button>
                <button onclick="deleteOperationBtn('${id}')" id="${id}" class="btn text-xs text-teal-500 hover:text-zinc-600 delete-operation-btn">Eliminar</button>
            </td>
        `
    }
};
renderOperations(operations)

//Function that saves my object
const saveOperationData = () => {
    //With this return I define the object
    return {
        id: randomId(),
        description: $("#description").value,
        amount: $("#amount").valueAsNumber,
        type: $("#benefit").value,
        category: $("#category").selectedOptions[0].text,
        date: $("#date").value,
    };
};

//function add operation
const addNewOperation = () => {
    //create a variable, bringing the operations of the localStorage
    const currentOperation = getOperations()
    //save in a variable, what the user entered in the form
    const operation = saveOperationData()
    //push the new data to the operations array
    currentOperation.push(operation)
    console.log(currentOperation)
    setItem({ operations: currentOperation });
    renderOperations(currentOperation)
    //clean the input field
    $("#description").value = "";
    $("#amount").value = "";
    $("#benefit").value = "";
    $("#category").value = "";
    $("#date").value = "";
};

$("#add-btn").addEventListener("click", addNewOperation)


//Function to filter operation 
const filterOperation = (idOperation, operations) => {
    return operations.find((operation) => operation.id === idOperation);
};

//Function for the "edit" button of the operations table 
const showEditOperationBtn = (id) => {
    showElement(".edit-form")
    hideElement(".form")
    hideElement("#operation-card")
    //Variable that saves the content of the filterCategory function and returns a filtered element of the array
    let editDenomination = filterOperation(id, getOperations());
    //Complete the value in the input
    $("#edit-description").value = editDenomination.description
    $("#edit-amount").value = editDenomination.amount
    $("#benefit").value = editDenomination.type
    $("#category").value = editDenomination.category
    $("#edit-date").value = editDenomination.date
    //Event to add the new edited value
    $("#edit-btn-operation").addEventListener("click", () => 
    editOperation(editDenomination.id));
};

//Functionality for the input to take the new value of said input
const editOperation = (id) => {
    //create a new operation
    let newOperation = {
        id: randomId(),
        description: $("#edit-description").value,
        amount: $("#edit-amount").valueAsNumber,
        type: $("#benefit").value,
        category: $("#category").selectedOptions[0].text,
        date: $("#edit-date").valueAsDate,
    };
    //Variable that saves the last updated data, and with the map method, it goes through each operation of the array
    let updatedOperations = getOperations().map((operation) => 
    //Use the ternary operator to search for the same id that enters by parameter, and save it in the new operation 
    operation.id === id ? { ...newOperation } : operation
    );
    renderOperations(updatedOperations);
    completeSelector(updatedOperations);
    setItem({ operations: updatedOperations });
    $("#edit-btn-operation").addEventListener("click", () => {
        hideElement(".edit-form")
        hideElement(".aside-cards")
        showElement("#operation-card")
        showElement("#table")
    });
};

//Function for the "delete" button from the operations table
const deleteOperationBtn = (id) => {
    let currentOperation = getOperations().filter((operation) => 
    operation.id !== id)
    setItem({ operations: currentOperation})
    renderOperations(currentOperation)
};













