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

//order
const orderValues = ["recent", "oldest", "highest", "lowest", "az", "za"];
const order = ["Más reciente", "Menos reciente", "Mayor monto", "Menor monto", "A/Z", "Z/A"];

for (let i = 0; i < orderValues.length; i++) {
    const option = document.createElement("option");
    option.innerHTML = order[i];
    option.value = orderValues[i]; // Agrega el valor correspondiente
    $("#order").appendChild(option);
}

// new operation section
// type
const type = ["Todos", "Gastos", "Ganancias"]

for (let type of types) {
    let option = document.createElement("option");
    option.innerHTML = `${type}`;
    $("#benefit").appendChild(option)
}

// new edit-operation section
// type
const typeEdit = ["Todos","Gastos", "Ganancias"]

for (let type of typeEdit) {
    let option = document.createElement("option");
    option.innerHTML = `${type}`;
    $("#edit-benefit").appendChild(option)
}

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
    hideElement(".edit-form")
})
//Hide Edit Category Section
$("#cancel-btn-category").addEventListener("click", () => {
    showElement(".category")
    hideElement(".edit-category")
})
//Hide Edit Operation Section
$("#cancel-btn-operation").addEventListener("click", () => {
    hideElement(".edit-form")
    showElement("#operation-card")
    showElement(".aside-cards")
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


//LocalStorage get item 
const getItems = () => {
    return JSON.parse(localStorage.getItem("data"));
};

const setItem = (data) => {
    localStorage.setItem("data", JSON.stringify({ ...getItems(), ...data}));
};

// Función para configurar los datos iniciales si es la primera vez que se abre la página
const initializeData = () => {
    const data = getItems();
    
    if (!data) {
        // No hay datos en el LocalStorage, configurar datos iniciales
        const categories = [
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
                name: "Educación",
            },
            {
                id: randomId(),
                name: "Transporte",
            },
            {
                id: randomId(),
                name: "Trabajo",
            },
        ];

        const initialData = {
            categories,
            operations: [],
        };

        // Save initial data to LocalStorage
        localStorage.setItem("data", JSON.stringify(initialData));
    }
};

// Call this function on page load to initialize the data if necessary
initializeData();

// Get Categories Function 
const getCategories = () => {
    return getItems()?.categories
};

let categories = getCategories() 

//Function to complete the selector form with categories 
const completeSelector = (categories) => {
    $$("#category").forEach((select) => {
        select.innerHTML = "";
        select.innerHTML += `<option value="${"todas"}">${"Todas"}</option>`
        for (let { name, id } of categories) {
            select.innerHTML += `<option value="${id}">${name}</option>`
        } 
    });
};
//Function to complete the selector edit-category with categories
const completeEditSelector = (categories) => {
    $$("#edit-category").forEach((select) => {
        select.innerHTML = "";
        for (let { name, id } of categories) {
            select.innerHTML += `<option value="${id}">${name}</option>`
        }
    });
};
completeEditSelector(categories);
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
    const editDenomination = filterCategory(id, getCategories());
    //Completa el value en el input
    $("#edit-category-input").value = editDenomination.name;
    //Establece el boton data-id en el boton de edicion
    $("#edit-btn-category").setAttribute("data-id", id);
    //Evento para que agregue el nuevo value editado
    // $("#edit-btn-category").addEventListener("click", () =>
    // editCategory(editDenomination.id))
};

$("#edit-btn-category").addEventListener("click", () => {
    //Obtiene el id almacenado en el atributo data-id
    const id = $("#edit-btn-category").getAttribute("data-id");
    editCategory(id);
    hideElement(".edit-category");
    showElement(".category");
});

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

const formatDate = (date) => {
    const inputDateValue = date
    const [year, month, day] = inputDateValue.split('-');
    const formattedInputDate = `${day}-${month}-${year}`;
    return formattedInputDate
};

// Operations table
const renderOperations = (operations) => {
    let colorAmount
    $("#tBody").innerHTML = ""
    for (const { id, description, type, category, date, amount } of operations) {
        if (type === "Ganancias") {
            colorAmount = "text-green-500" 
        } else {
            colorAmount = "text-red-500"
        }
        $("#tBody").innerHTML += `
            <td class="font-semibold text-gray-600">${description}</td>
            <td class="text-teal-800 bg-teal-100 rounded">${category}</td>
            <td class="text-gray-500">${formatDate(date)}</td>
            <td class="${colorAmount}">$${amount}</td>
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
    $("#edit-benefit").value = editDenomination.type
    $("#edit-category").selectedOptions[0].text = editDenomination.category
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
        type: $("#edit-benefit").value,
        category: $("#edit-category").selectedOptions[0].text,
        date: $("#edit-date").value,
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


// ---------------------------------------------------------------------------
//                                 FILTERS
//  --------------------------------------------------------------------------

// hide/show filters function
const toggleFilters = () => {
    const toggle = $(".hide-filters")
    const filters = $(".input-filters")
  
    if (toggle.innerText === 'Ocultar filtros') {
      toggle.innerText = 'Mostrar filtros'
      filters.classList.add('hidden')
    } else {
      toggle.innerText = 'Ocultar filtros'
      filters.classList.remove('hidden')
    }
  };

$(".hide-filters").addEventListener("click", toggleFilters)

//Function filter by type
const filterByType = (type) => {
    // Inicializo una variable que guarda el resultado de filtrar el array operations
    // El método filter me devuelve todos los elementos que cumplan con la condición
    let operations = getOperations()
    let filteredOperations = operations.filter((operation) => 
    operation.type === type);
    if (type === "Todos") {
        filteredOperations = operations
    }
    return filteredOperations
};

//Function filter by categories
const filterByCategory = (filteredOperations, category) => {
    //let operations = getOperations()
    console.log(filteredOperations)
    let aux = filteredOperations
    console.log(category)
    filteredOperations = filteredOperations.filter((operation) => 
    operation.category === category);
    if (category === "Todas") {
        filteredOperations = aux
    }
    console.log(filteredOperations)
    return filteredOperations
};

// Function to filter operations by date
const filterByDate = (filteredOperations, selectedDate) => {
    return filteredOperations.filter((operation) => {
        // Convertir la fecha de la operación a un objeto Date para comparar
        const operationDate = new Date(operation.date);
        // Comparar la fecha de la operación con la fecha seleccionada
        return operationDate >= selectedDate;
    });
};

//Function to order recent
const orderRecent = (filteredOperations) => {
    filteredOperations.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return filteredOperations
};

//Function to order oldest
const orderOldest = (filteredOperations) => {
    filteredOperations.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return filteredOperations
};

//Function to order highest amount
const orderHighestAmount = (filteredOperations) => {
    filteredOperations.sort((a, b) => b.amount - a.amount);
    return filteredOperations
};

//Function to order lowest amount
const orderLowestAmount = (filteredOperations) => {
    filteredOperations.sort((a, b) => a.amount - b.amount);
    return filteredOperations
};

//Function to order AZ
const orderAz = (filteredOperations) => {
    filteredOperations.sort((a, b) => a.description.localeCompare(b.description))
    return filteredOperations
};  

//Function to order ZA
const orderZa = (filteredOperations) => {
    filteredOperations.sort((a, b) => b.description.localeCompare(a.description))
    return filteredOperations
}; 

//Function that executes the inputs  
const applyFilters = () => {
    const type = $("#type").value;
    const category = $(".category-filter").selectedOptions[0].text;
    const selectedDate = new Date($(".date").value);
    const order = $(".order").value;
    
    
    let filteredOperations = filterByType(type)
    filteredOperations = filterByCategory(filteredOperations, category)
    filteredOperations = filterByDate(filteredOperations, selectedDate);
    balance(filteredOperations)
    //Apply the sorting according to the selected criteria
    if (order === "recent") {
        // Sort from most recent to least recent
        orderRecent(filteredOperations)
    } else if (order === "oldest") {
        // Sort from least recent to most recent
        orderOldest(filteredOperations)
    }

    //Apply the order from highest to lowest amount
    if (order === "highest") {
        // Sort from highest amount to lowest amount
        orderHighestAmount(filteredOperations)
    } else if (order === "lowest") {
        // Sort from lowest amount to highest amount
        orderLowestAmount(filteredOperations)
    }

    //Apply the order of AZ/ZA
    if (order === "az") {
        // Sort from highest amount to lowest amount
        orderAz(filteredOperations)
    } else if (order === "za") {
        // Sort from lowest amount to highest amount
        orderZa(filteredOperations)
    }

    // Render results in table
    renderOperations(filteredOperations);
    showElement("#table")
    hideElement("#img")
    }


// Listen to filter change events
$("#type").addEventListener("change", applyFilters);
$(".category-filter").addEventListener("change", applyFilters);
$(".date").addEventListener("change", applyFilters);
$(".order").addEventListener("change", applyFilters);


// -------------------------------------------------------------
//                       BALANCE
// -------------------------------------------------------------

//Function that shows the values ​​according to the applied filters
const balance = (filteredOperations) => {
    let totalCost = 0
    let totalProfit = 0
    filteredOperations.forEach(item => {
        const amount = parseFloat(item.amount)
        if (item.type === "Gastos") {
            totalCost += amount
        } else if (item.type === "Ganancias") {
            totalProfit += amount
        }
    });
    const total = totalProfit - totalCost

    document.getElementById("profit").textContent = "$"+totalProfit
    document.getElementById("cost").textContent = "$"+totalCost
    document.getElementById("total").textContent = "$"+total
};
