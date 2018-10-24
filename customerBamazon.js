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
    console.log("connected as id " +  connection.threadId);
    console.log("Welcome to Bamazon!");
    shop(); //Function to start Customer Engagment
    connection.end();
});

// Customer Prompt
function shop() {
    // Displays all Products from Database
    connection.query ("SELECT * FROM products", function(err, res){
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            console.log("\ID: " + res[i].id + 
            "   Product: " + res[i].product_name + 
            "           Price: " + "$" + res[i].price);
        }
    });
    inquirer.prompt([
        {
            name: "item",
            type: "input",
            message: "Please type the ID # of the item would you like to buy."
        }
    ]).then(function (answer))
}

