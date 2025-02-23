// CREATE AN ARRAY OF EMPLOYEES
let employees = [
  [12345678, "Alice Johnson", 1234, "alice.johnson@example.com", "Engineering"],
  [87654321, "Bob Smith", 5678, "bob.smith@example.com", "Marketing"],
  [13572468, "Charlie Brown", 9012, "charlie.brown@example.com", "QA"],
  [24681357, "Dana White", 3456, "dana.white@example.com", "Sales"],
  [11223344, "Eve Black", 7890, "eve.black@example.com", "Administrative"],
];

// CHECK TO SEE IF STORAGE OBJECT EXISTS WHEN THE PAGE LOADS
// IF DOES, RETURN STORAGE OBJECT INTO ARRAY INSTEAD OF POPULATED ARRAY
if (localStorage.getItem("employees")) {
  employees = JSON.parse(localStorage.getItem("employees"));
}

// GET DOM ELEMENTS
const form = document.getElementById("addForm");
const empTable = document.getElementById("empTable");
const empCount = document.getElementById("empCount");
const tbody = empTable.querySelector("tbody");

// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS
buildGrid();

// ADD EMPLOYEE
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // GET THE VALUES FROM THE TEXT BOXES
  const id = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const extension = document.getElementById("extension").value;
  const email = document.getElementById("email").value;
  const department = document.getElementById("department").value;

  // ADD THE NEW EMPLOYEE TO A NEW ARRAY OBJECT
  const newEmployee = [id, name, extension, email, department];

  // PUSH THE NEW ARRAY TO THE *EXISTING* EMPLOYEES ARRAY
  employees.push(newEmployee);

  // BUILD THE GRID
  buildGrid();

  // RESET THE FORM
  form.reset();

  // SET FOCUS BACK TO THE ID TEXT BOX
  document.getElementById("id").focus();
});

// DELETE EMPLOYEE
empTable.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    if (confirm("Are you sure you want to delete this employee?")) {
      // GET THE SELECTED ROWINDEX FOR THE TR
      const rowIndex = e.target.closest("tr").rowIndex - 1; // Adjust for header row

      // REMOVE EMPLOYEE FROM ARRAY
      employees.splice(rowIndex, 1);

      // BUILD THE GRID
      buildGrid();
    }
  }
});

// BUILD THE EMPLOYEES GRID
function buildGrid() {
  // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
  tbody.innerHTML = "";

  // LOOP THROUGH THE ARRAY OF EMPLOYEES REBUILDING THE ROW STRUCTURE
  for (const employee of employees) {
    const row = document.createElement("tr");
    employee.forEach((item) => {
      const cell = document.createElement("td");
      cell.textContent = item;
      row.appendChild(cell);
    });

    // CREATE DELETE BUTTON
    const deleteCell = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-sm btn-danger delete";
    deleteBtn.textContent = "Delete";
    deleteCell.appendChild(deleteBtn);
    row.appendChild(deleteCell);

    tbody.appendChild(row);
  }

  // UPDATE EMPLOYEE COUNT
  empCount.textContent = `(${employees.length})`;

  // STORE THE ARRAY IN STORAGE
  localStorage.setItem("employees", JSON.stringify(employees));
}
