// Get references to HTML elements
const descriptionInput = document.getElementById('descriptionInput');
const amountInput = document.getElementById('amountInput');
const expenseTable = document.getElementById('expenseTable');
const totalExpense = document.getElementById('totalExpense');

// Create an empty array to store expenses
let expenses = [];

// Function to add an expense
function addExpense() {
    // Retrieve values from input fields
    const description = descriptionInput.value;
    const amount = parseFloat(amountInput.value);

    // Validate user's input
    if (description === '' || isNaN(amount)) {
        alert('Please enter a valid description and amount.');
        return;
    }

    // Create an expense object
    const expense = {
        description: description,
        amount: amount
    };

    // Add the expense to the array
    expenses.push(expense);

    // Call a function to update the expense table
    updateExpenseTable();

    // Calculate and update the total expense
    calculateTotalExpense();

    // Clear input fields
    descriptionInput.value = '';
    amountInput.value = '';
}

// Function to update the expense table
function updateExpenseTable() {
    // Clear the table body
    expenseTable.innerHTML = '';

    // Iterate over expenses array and create table rows
    for (let i = 0; i < expenses.length; i++) {
        const expense = expenses[i];

        // Create a table row
        const row = document.createElement('tr');

        // Create table cells for description, amount, and delete button
        const descriptionCell = document.createElement('td');
        descriptionCell.textContent = expense.description;

        const amountCell = document.createElement('td');
        amountCell.textContent = expense.amount;

        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            // Call a function to delete the expense
            deleteExpense(i);
        });

        deleteCell.appendChild(deleteButton);

        // Append cells to the row
        row.appendChild(descriptionCell);
        row.appendChild(amountCell);
        row.appendChild(deleteCell);

        // Append the row to the table
        expenseTable.appendChild(row);
    }
}

// Function to delete an expense
function deleteExpense(index) {
    // Remove the expense from the array
    expenses.splice(index, 1);

    // Call a function to update the expense table
    updateExpenseTable();

    // Calculate and update the total expense
    calculateTotalExpense();
}

// Function to calculate the total expense
function calculateTotalExpense() {
    let total = 0;

    // Iterate over expenses array and sum the amounts
    for (let i = 0; i < expenses.length; i++) {
        total += expenses[i].amount;
    }

    // Update the total expense display
    totalExpense.textContent = total;
}
