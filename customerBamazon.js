//NPM MySQL and Inquirer set up

let mysql = require("mysql");
let inquirer = require("inquirer");

//Connecttion info to MySQL Database
let connection = mysql.createConnection({
    host: "local host" ,
    port: 3306,
    user: "root",
    password: "",
    database: "bamazonDB",
});

//Connect to MySQL Database
connection.connect(function(err){
    if (err){ throw err};
    console.log("connected as id " +  connection.threadId);
    console.log("Welcome to Bamazon!");
    shop(); //Function to start Customer Engagment
    connection.end();
});

// Customer Prompt
function shop() {
    // Displays all Products from Database
    connection.query ("SELECT * FROM products", function(err, results){
        if (err) throw err;
        //Ask User what they would like to buy
        inquirer.prompt([
            {

            }
        ]);
    });
}
