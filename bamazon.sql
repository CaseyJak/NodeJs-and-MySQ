DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;
USE bamazonDB;

CREATE TABLE products(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR (50) NULL,
    department_name VARCHAR (30) NULL,
    price DECIMAL (10,2) NULL,
    stock_quantity INT NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("God of War", "Video Games", 59.99, 40),
        ("PS4 PRO", "Video Games", 399.99, 15),
        ("Beats Wireless Headphones", "Electronics", 199.99, 30),
        ("Deadpool 2 Blu-Ray", "Movies", 29.99, 83),
        ("55-inch OLED TV", "Electronics", 2199.99, 6),
        ("Nier: Automata", "Video Games", 44.99, 35),
        ("The Predator Blu-Ray", "Movies", 24.99, 49),
        ("American Gods", "Books", 19.99, 34),
        ("Fight Club", "Books", 24.99, 76),
        ("A Clockwork Orange", "Books", 14.99, 23);