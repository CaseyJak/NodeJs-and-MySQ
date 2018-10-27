//NPM MySQL and Inquirer set up

let mysql = require("mysql");
let inquirer = require("inquirer");

//Connecttion info to MySQL Database
let connection = mysql.createConnection({
    host: "localhost" ,
    port: 3306,
    user: "root",
    password: "",
    database: "bamazonDB",
});

//Connect to MySQL Database
connection.connect(function(err){
    if (err) throw err;
    console.log("Welcome to Bamazon!");
    start(); //To Start Customer Engagment
});

//Customer Engagment
function start() {
    //Query Database To Show Product Selection
    connection.query ("SELECT * FROM products", function(err, res){
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            console.log("\ID: " + res[i].id + 
            "   Product: " + res[i].product_name + 
            "           Price: " + "$" + res[i].price);
        }
        shop() //Ask Item Selection
    });
}

//Ask Customer Item Selection
function shop() {
    inquirer.prompt([
        {
            name: "ID",
            type: "input",
            message: "Please type the ID # of the item would you like to buy?"
        }
    ]).then(answer => {
        //Checking Database
        let query = "SELECT * FROM products";
        connection.query(query, function(err, res){
            if (err) throw err;
            //ID Check Logic
            let goodID = [1,2,3,4,5,6,7,8,9,10];
            let choiceID = parseInt(answer.ID);
            chosenItem = res[choiceID - 1]; 
            //If INVALID
            if (goodID.includes(choiceID) === true) {      
                quantity(); //Ask Quantity Selection
            }
            //If Valid
            else {
                console.log("INVALID ID: Please try again");
                shop() //Ask Item Selection
            }
        })
    })
}  

//Ask Customer Quantity Selection
function quantity() {
    inquirer.prompt([
        {
            name: "quantity",
            input: "input",
            message: "In what quantity would you like to buy?"
        }
    ]).then(quant => {
        //Stock Check Logic
       choiceQuantity = parseInt(quant.quantity);  /* Global */ 
        //If Enough Quantity
        if (choiceQuantity <= chosenItem.stock_quantity) {
            console.log("You have selected " + chosenItem.product_name + " with a quantity of " + choiceQuantity + ".");
            doubleCheck();
        }
        //If Not Enough Quantity
        else {
            console.log("Sorry, we do not have enough stock to fulfill your order. Please try again.")
            shop();
        }
    });
}    
//Product Selection Verification
function doubleCheck() {
    inquirer.prompt([
        {
            name: "verify",
            type: "list",
            message:"Are you sure?",
            choices: ["Yes", "No"]
        }
    ]).then(verify => {
        let total = chosenItem.price * choiceQuantity;
        if (verify.verify === "Yes") {
            console.log("Thank you! Your total is going to be $" + total + ".");
            end();
        }
        else {
            end();
        }
    })
}

//Continue Shopping
function end() {
    inquirer.prompt([
        {
            name: "end",
            type: "list",
            message: "Would you like to keep shopping?",
            choices: ["Yes", "No"]
        }
    ]).then(end => {
        //If Yes Restart
        if (end.end === "Yes") {
            console.log("\nGreat! Here is our selection:\n")
            start();
        }
        //If No End Connection
        else {
            console.log("Okay, thank you for looking.")
            connection.end();
        }
    })
}