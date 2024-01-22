let groceryList = JSON.parse(localStorage.getItem("grocery-list")) || [];
// display the todo-list even when the page is refreshed
renderGroceryList();
document.querySelector(".js-submit-btn").addEventListener("click", () => {
  submitGroceryList();
});

function submitGroceryList() {
  const inputElement = document.querySelector(".js-name-input");
  const name = inputElement.value;
  if (name === "") {
    alert("You did not add any grocery list!");
  } else {
    groceryList.push(name);
    inputElement.value = "";

    renderGroceryList();
    // Whenever we update the todo list, save it in localStorage.
    saveToStorage();
    console.log(groceryList);
  }
}

function renderGroceryList() {
  let groceryListContainer = "";
  groceryList.forEach((grocery) => {
    const name = grocery;
    const html = `<div class = "grocery-name">- ${name}</div>
                  <button class = "edit-btn js-edit-btn"><i class="fa-regular fa-pen-to-square"></i></button>  
                  <button class = "clear-btn js-clear-btn"><i class="fa-solid fa-trash"></i></button>  
            `;
    groceryListContainer += html;
  });
  document.querySelector(".js-grocery-list").innerHTML = groceryListContainer;

  // Select all clear buttons
  document.querySelectorAll(".js-clear-btn").forEach((clearBtn, index) => {
    clearBtn.addEventListener("click", () => {
      groceryList.splice(index, 1);
      renderGroceryList();
      saveToStorage();
    });
  });

  // Select all edit buttons

  document.querySelectorAll(".js-edit-btn").forEach((editBtn, index) => {
    editBtn.addEventListener("click", () => {
      editGroceryList(index);
    });
  });
}

// Click enter keyword instead of clicking submit button when finish input
document.querySelector(".js-name-input").addEventListener("keydown", () => {
  handleKeyDown();
});

// delete all items in the list and save it in local storage
document.querySelector(".js-clear-item").addEventListener("click", () => {
  groceryList.splice(0, groceryList.length);
  saveToStorage();
});

// function to edit the grocery list
function editGroceryList(index) {
  const groceryItem = groceryList[index];
  const newName = prompt("Enter a new grocery list:", groceryItem); // default value

  if (newName !== null) {
    //In the case of a simple list, such as groceryList containing only strings or numbers,
    // the default value approach is not applicable because the elements of the list are primitive values,
    // and changing the value of a variable storing a list element will not update the corresponding element in the list.
    //To update a specific element in a list, you need to directly assign a new value to that element using the index.
    groceryList[index] = newName;
    renderGroceryList();
    saveToStorage();
  }
}

function handleKeyDown() {
  if (event.key === "Enter") {
    submitGroceryList();
  }
}

function saveToStorage() {
  localStorage.setItem("grocery-list", JSON.stringify(groceryList));
}

// Display night or light mode screen
const toggler = document.querySelector(".switch");
const body = document.querySelector("body");
const iconContainer = document.querySelector(".icon-container");

// Check if the user has a preference stored
const storedMode = localStorage.getItem("is-dark");

// Apply the stored mode or default to light mode
if (storedMode === "dark") {
  body.classList.add("dark-mode");
  iconContainer.innerHTML = '<i class="fa-regular fa-moon"></i>';
  // set the toggle.checked to be true to activate the toggle animation in css
  toggler.checked = true;
} else {
  iconContainer.innerHTML = '<i class="fa-regular fa-sun"></i>';
}

// Add event listener to the toggle switch
toggler.addEventListener("change", () => {
  // Toggle the dark mode class on the body
  body.classList.toggle("dark-mode");

  // Store the user's preference in localStorage
  isDarkMode = body.classList.contains("dark-mode");

  localStorage.setItem("is-dark", isDarkMode ? "dark" : "light");

  // Update the icon according to the condition if it's dark or light mode
  iconContainer.innerHTML = isDarkMode
    ? '<i class="fa-regular fa-moon"></i>'
    : '<i class="fa-regular fa-sun"></i>';
});
