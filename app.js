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
                  <button class = "edit-btn js-edit-btn">Edit</button>  
                  <button class = "clear-btn js-clear-btn">Clear</button>  
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
}

// Select all edit buttons

document.querySelectorAll(".js-edit-btn").forEach((editBtn, index) => {
  editBtn.addEventListener("click", () => {
    editGroceryList(index);
  });
});

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
