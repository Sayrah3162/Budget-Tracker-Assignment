


class BudgetTracker {
constructor(){
    this.transactions = this.loadTransactions();
    this.form = document.getElementById("transactionform");
    this.transactionList = document.getElementById("transactionList");
    this.balanceElement = document.getElementById("balance");

    this.initEventlisteners();
    this.renderTransactions();
    this.updateBalance();


} 
loadTransactions()  {

    return JSON.parse(localStorage.getItem("transactions")) ||[];
}
saveTransactions(){
    localStorage.setItem("transactions", JSON.stringify(this.transactions));
}
initEventlisteners() {
this.form.addEventListener("submit", e => {
    e.preventDefault();
    this.addTransaction();

});

}
clearform(){
    document.getElementById("description").value = "";
    document.getElementById("amount").Value = "";

}
addTransaction(){
const description = document.getElementById("description").value.trim();
const amount = parseFloat(document.getElementById("amount").value);
const type = document.getElementById("type").value;

if (!description || isNaN(amount)) {
    alert("please provide a valid Description and amount.");
    return;
}
const transaction = {
    id: Date.now(),
    description,
    amount: type === "Expense"? -amount  : amount,
    type
} 

this.transactions.push(transaction);
this.saveTransactions();
this.renderTransactions();
this.updateBalance();
this.clearform();
}

renderTransactions() {
    this.transactionList.innerHTML = "";
    this.transactions.slice().sort((a,b) => b.id - a.id).forEach(transaction=> {
const transactionsDiv = document.createElement("div");
transactionsDiv.classList.add("transaction", transaction.type );
transactionsDiv.innerHTML =  
               `
               <span>${transaction.description} </span>
                <span class="Transaction-amount-container">$${ Math.abs (transaction.amount).toFixed(2)}
                <button class="delete-btn" data-id"${transaction.id}">Delete</button>

                </span> `;
                this.transactionList.appendChild(transactionsDiv);

    });
    this.attachDeleteEventlistener();

}

attachDeleteEventlistener(){
    this.transactionList.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", () => {
            this.deleteTransaction(Number(button.dataset.id));
        });
    });
}
deleteTransaction(id){
this.transactions = this.transactions.filter((transaction) => transaction.id !== id 
);

this.saveTransactions();
this.renderTransactions();
this.updateBalance();
}

updateBalance(){
const balance = this.transactions.reduce((total, transaction ) => total + transaction.amount, 0);

this.balanceElement.textContent = `Balancea: $${balance.toFixed(2)}`;
this.balanceElement.style.color = balance >= 0 ? "#2ecc71" : "#e74c3c" ;
}
}
const budgetTracker = new BudgetTracker();

const transactions = [
    {amount: 100},
    {amount: -50},
    {amount: 200}
];

const balance = transactions.reduce ((total, transaction) =>
    total + transaction.amount,
 0
);

console.log("Balance:", balance);