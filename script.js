//setting budget
//introduce variables for money left and money spent:
let moneySpent = 0;
let moneyLeft = 0;

//function for taking off "£" sign in case users have entered the currency in the initial budget input:
function leftMoneyCalculator() {
    return (
        Number(document.getElementById("budget").textContent.replace("£", "")) -
        moneySpent
    );
}
function updateBudgetDisplay() {
    document.getElementById("expenditure").textContent = `£${moneySpent
        .toFixed(2)
        .toString()}`;
    if (moneyLeft < 0) {
        left.textContent = `You exceeded your budget by ${Math.abs(
            moneyLeft
        ).toFixed(2)} £`;
    } else if (moneyLeft > 0) {
        left.textContent = `£${moneyLeft.toFixed(2)}`;
    } else if (moneyLeft === 0) {
        left.textContent = "0";
    }
    console.log(moneyLeft);

    left.classList.toggle("amount", moneyLeft > 0 || moneyLeft === 0);
    left.classList.toggle("notEnoughMoneyWarning", moneyLeft < 0);
}
function leftMoneySetter() {
    left.textContent =
        moneyLeft < 0
            ? `You exceeded your budget by ${Math.abs(moneyLeft)
                .toFixed(2)
                .toString()} £`
            : `£${moneyLeft.toFixed(2).toString()}`;
    if (moneyLeft < 0) {
        left.classList.remove("amount");
        left.classList.add("notEnoughMoneyWarning");
    }
    if (moneyLeft > 0) {
        left.classList.add("amount");
        left.classList.remove("notEnoughMoneyWarning");
    }
}
const budget = document.getElementById("budget");
const left = document.getElementById("left");
const budgetButton = document.getElementById("submit");
function budgetSetter() {
    const inputbudget = +document.getElementById("budgetInput").value;
    budget.textContent = `£${inputBudget.toFixed(2).toString()}`;
    moneyLeft = leftMoneyCalculator();
    leftMoneySetter();
}

budgetButton.addEventListener("click", budgetSetter);

// expences list

var e = document.getElementById("type");
function onChange() {
    var text = e.options[e.selectedIndex].text;
    return text; //Gets value from drop down
}

function listElement() {
    const type = document.createElement("p");
    type.textContent = onChange();
    type.classList.add("itemType");
    type.classList.add(onChange().replace(" ", ""));
    const description = document.createElement("p");
    description.textContent = document.getElementById("description").value;
    const price = document.createElement("p");
    price.textContent = `£${(+document.getElementById("price").value)
        .toFixed(2)
        .toString()}`;
    const itemId = Math.random().toString();
    price.setAttribute("id", itemId);
    const listItem = document.createElement("div");
    const elInfo = document.createElement("div");
    listItem.appendChild(elInfo);
    // const itemId = Math.random().toString();
    elInfo.classList.add("listElInfo");
    listItem.classList.add("listEl");
    // listItem.setAttribute("id", itemId);
    elInfo.appendChild(type);
    elInfo.appendChild(description);
    elInfo.appendChild(price);
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "deleteButton");
    deleteButton.textContent = "DELETE";
    deleteButton.addEventListener(
        "mouseenter",
        function (event) {
            event.target.style.backgroundColor = "red";
            event.target.style.color = "white";
            event.target.style.border = "0.5px solid grey";
        },
        false
    );
    deleteButton.addEventListener(
        "mouseleave",
        function (event) {
            event.target.style.backgroundColor = "#f4f4f4";
            event.target.style.color = "black";
            event.target.style.border = "0.5px solid grey";
        },
        false
    );

    listItem.appendChild(deleteButton);
    deleteButton.addEventListener("click", function () {
        moneySpent -= Number(
            document.getElementById(itemId).textContent.replace("£", "")
        );
        listItem.remove();
        moneyLeft = leftMoneyCalculator();
        updateBudgetDisplay();
        checkNoItemsAdded();
    });

    const warning = document.getElementById("warningContainer");
    if (warning) {
        document.getElementById("sectionList").removeChild(warning);
    }
    document.getElementById("sectionList").appendChild(listItem);
    moneySpent += +document.getElementById("price").value;
    document.getElementById("expenditure").textContent = `£${moneySpent
        .toFixed(2)
        .toString()}`;
    moneyLeft = leftMoneyCalculator();
    leftMoneySetter();
    document.getElementById("description").value = "";
    document.getElementById("price").value = "";
}

function checkNoItemsAdded() {
    const listItemElements = document.querySelectorAll(".listEl");

    if (listItemElements.length === 0) {
        document.getElementById("expenditure").textContent = "0";
        document.getElementById(
            "sectionList"
        ).innerHTML = `<div id="warningContainer">
        <p id="noItemsAddedWarning">No items added yet</p>
        </div>`;
    }
}
